import { create } from 'zustand';
import type {
  Program,
  Workout,
  Exercise,
  SessionLog,
  ProgramEnrollment,
  WeeklyPlanItem,
  PerceivedDifficulty,
  CompletedExercise,
} from '../models/types';

// Import seed data
import programsData from '../../seed-data/programs.json';
import workoutsData from '../../seed-data/workouts.json';
import exercisesData from '../../seed-data/exercises.json';

interface WorkoutState {
  // Data
  programs: Program[];
  workouts: Workout[];
  exercises: Exercise[];
  sessionLogs: SessionLog[];
  currentEnrollment: ProgramEnrollment | null;
  weeklyPlan: WeeklyPlanItem[];
  
  // Current session state
  activeWorkout: Workout | null;
  currentExerciseIndex: number;
  sessionStartTime: Date | null;
  completedExercises: CompletedExercise[];
  
  // Loading states
  isLoading: boolean;
  
  // Actions - Data loading
  loadSeedData: () => void;
  
  // Actions - Program management
  enrollInProgram: (programId: string) => void;
  unenrollFromProgram: () => void;
  
  // Actions - Workout session
  startWorkout: (workoutId: string) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  completeExercise: (exerciseId: string, completedSets: number, skipped?: boolean) => void;
  completeWorkout: (perceivedDifficulty: PerceivedDifficulty, notes?: string[]) => void;
  cancelWorkout: () => void;
  
  // Actions - Weekly plan
  generateWeeklyPlan: () => void;
  
  // Getters
  getProgramById: (id: string) => Program | undefined;
  getWorkoutById: (id: string) => Workout | undefined;
  getExerciseById: (id: string) => Exercise | undefined;
  getCurrentExercise: () => Exercise | undefined;
  getTodayWorkout: () => Workout | undefined;
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  programs: [],
  workouts: [],
  exercises: [],
  sessionLogs: [],
  currentEnrollment: null,
  weeklyPlan: [],
  activeWorkout: null,
  currentExerciseIndex: 0,
  sessionStartTime: null,
  completedExercises: [],
  isLoading: false,
  
  loadSeedData: () => {
    set({
      programs: programsData as Program[],
      workouts: workoutsData as Workout[],
      exercises: exercisesData as Exercise[],
    });
  },
  
  enrollInProgram: (programId) => {
    const program = get().getProgramById(programId);
    if (!program) return;
    
    const enrollment: ProgramEnrollment = {
      id: generateId(),
      userId: 'current_user',
      programId,
      startDate: new Date().toISOString(),
      currentWeek: 1,
      currentSessionIndex: 0,
      completedSessions: [],
      status: 'active',
    };
    
    set({ currentEnrollment: enrollment });
    get().generateWeeklyPlan();
  },
  
  unenrollFromProgram: () => {
    set({ currentEnrollment: null, weeklyPlan: [] });
  },
  
  startWorkout: (workoutId) => {
    const workout = get().getWorkoutById(workoutId);
    if (!workout) return;
    
    set({
      activeWorkout: workout,
      currentExerciseIndex: 0,
      sessionStartTime: new Date(),
      completedExercises: [],
    });
  },
  
  nextExercise: () => {
    const { activeWorkout, currentExerciseIndex } = get();
    if (!activeWorkout) return;
    
    if (currentExerciseIndex < activeWorkout.exercises.length - 1) {
      set({ currentExerciseIndex: currentExerciseIndex + 1 });
    }
  },
  
  prevExercise: () => {
    const { currentExerciseIndex } = get();
    if (currentExerciseIndex > 0) {
      set({ currentExerciseIndex: currentExerciseIndex - 1 });
    }
  },
  
  completeExercise: (exerciseId, completedSets, skipped = false) => {
    const { completedExercises } = get();
    const existingIndex = completedExercises.findIndex(e => e.exerciseId === exerciseId);
    
    const completedExercise: CompletedExercise = {
      exerciseId,
      completedSets,
      skipped,
    };
    
    if (existingIndex >= 0) {
      const updated = [...completedExercises];
      updated[existingIndex] = completedExercise;
      set({ completedExercises: updated });
    } else {
      set({ completedExercises: [...completedExercises, completedExercise] });
    }
  },
  
  completeWorkout: (perceivedDifficulty, notes = []) => {
    const { activeWorkout, sessionStartTime, completedExercises, currentEnrollment, sessionLogs } = get();
    if (!activeWorkout || !sessionStartTime) return;
    
    const durationMinutes = Math.round((Date.now() - sessionStartTime.getTime()) / 60000);
    
    const sessionLog: SessionLog = {
      id: generateId(),
      userId: 'current_user',
      workoutId: activeWorkout.id,
      programId: currentEnrollment?.programId,
      date: new Date().toISOString(),
      durationMinutes,
      perceivedDifficulty,
      notes,
      completedExercises,
    };
    
    // Update enrollment if in a program
    if (currentEnrollment) {
      const program = get().getProgramById(currentEnrollment.programId);
      if (program) {
        const weekSessions = program.weekStructure[currentEnrollment.currentWeek - 1]?.sessions || [];
        const nextSessionIndex = currentEnrollment.currentSessionIndex + 1;
        
        let newWeek = currentEnrollment.currentWeek;
        let newSessionIndex = nextSessionIndex;
        
        if (nextSessionIndex >= weekSessions.length) {
          newWeek = currentEnrollment.currentWeek + 1;
          newSessionIndex = 0;
        }
        
        set({
          currentEnrollment: {
            ...currentEnrollment,
            currentWeek: newWeek,
            currentSessionIndex: newSessionIndex,
            completedSessions: [...currentEnrollment.completedSessions, activeWorkout.id],
            status: newWeek > program.weeks ? 'completed' : 'active',
          },
        });
      }
    }
    
    set({
      sessionLogs: [...sessionLogs, sessionLog],
      activeWorkout: null,
      currentExerciseIndex: 0,
      sessionStartTime: null,
      completedExercises: [],
    });
    
    get().generateWeeklyPlan();
  },
  
  cancelWorkout: () => {
    set({
      activeWorkout: null,
      currentExerciseIndex: 0,
      sessionStartTime: null,
      completedExercises: [],
    });
  },
  
  generateWeeklyPlan: () => {
    const { currentEnrollment, workouts, sessionLogs } = get();
    const today = new Date();
    const weeklyPlan: WeeklyPlanItem[] = [];
    
    // Generate 7-day plan
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Check if there's a completed session for this date
      const completedSession = sessionLogs.find(
        (log) => log.date.split('T')[0] === dateString
      );
      
      let workout: Workout | undefined;
      
      if (currentEnrollment) {
        const program = get().getProgramById(currentEnrollment.programId);
        if (program && currentEnrollment.currentWeek <= program.weeks) {
          const weekData = program.weekStructure[currentEnrollment.currentWeek - 1];
          if (weekData) {
            // Assign workouts based on available training days
            const trainingDays = [1, 3, 5]; // Mon, Wed, Fri by default
            const dayIndex = trainingDays.indexOf(date.getDay());
            if (dayIndex >= 0 && dayIndex < weekData.sessions.length) {
              workout = workouts.find(w => w.id === weekData.sessions[dayIndex]);
            }
          }
        }
      }
      
      weeklyPlan.push({
        date: dateString,
        dayOfWeek: date.getDay(),
        workout,
        isRestDay: !workout,
        isCompleted: !!completedSession,
        sessionLogId: completedSession?.id,
      });
    }
    
    set({ weeklyPlan });
  },
  
  getProgramById: (id) => get().programs.find((p) => p.id === id),
  getWorkoutById: (id) => get().workouts.find((w) => w.id === id),
  getExerciseById: (id) => get().exercises.find((e) => e.id === id),
  
  getCurrentExercise: () => {
    const { activeWorkout, currentExerciseIndex, exercises } = get();
    if (!activeWorkout) return undefined;
    
    const workoutExercise = activeWorkout.exercises[currentExerciseIndex];
    if (!workoutExercise) return undefined;
    
    return exercises.find((e) => e.id === workoutExercise.exerciseId);
  },
  
  getTodayWorkout: () => {
    const { weeklyPlan } = get();
    const today = new Date().toISOString().split('T')[0];
    const todayPlan = weeklyPlan.find((item) => item.date === today);
    return todayPlan?.workout;
  },
}));
