// Type definitions for Apex Athletic Training App

export type TrainingGoal = 'speed' | 'vertical_jump' | 'explosiveness' | 'agility' | 'athletic_base';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type EquipmentAccess = 'bodyweight' | 'minimal' | 'full_gym';
export type InjuryFlag = 'ankle' | 'knee' | 'meniscus' | 'hip' | 'lower_back' | 'shoulder';
export type PerceivedDifficulty = 'easy' | 'good' | 'hard';
export type SessionType = 'technique' | 'power' | 'speed' | 'strength' | 'endurance' | 'recovery';
export type ExerciseIntent = 'Speed' | 'Reactive' | 'Control' | 'Power' | 'Mobility';
export type DemoType = 'gif' | 'mp4' | 'lottie' | 'svg';
export type TargetType = 'reps' | 'seconds' | 'distance';

// User Profile
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  dob?: string;
  locale: string;
  goals: TrainingGoal[];
  sport?: string;
  experience: ExperienceLevel;
  equipment: EquipmentAccess;
  daysPerWeek: number;
  injuryFlags: InjuryFlag[];
  videoUploadConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Exercise definition
export interface Exercise {
  id: string;
  name: string;
  intents: ExerciseIntent[];
  demoType: DemoType;
  demoUrl?: string;
  difficulty: number;
  primaryMuscles: string[];
  unilateral: boolean;
  cues: string[];
  recommendedRestSeconds: number;
  contactLoad: number;
  tags: string[];
  equipmentRequired: string[];
  contraindications: InjuryFlag[];
}

// Exercise within a workout
export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps?: number;
  duration?: number; // seconds for timed exercises
  distance?: string; // e.g., '20m'
  restSeconds: number;
  targetType: TargetType;
}

// Workout definition
export interface Workout {
  id: string;
  title: string;
  goal: string;
  durationEstimateMinutes: number;
  exercises: WorkoutExercise[];
  intensityScore: number;
  sessionType: SessionType;
  totalContacts: number;
}

// Week structure in a program
export interface WeekStructure {
  weekNumber: number;
  theme: string;
  sessions: string[]; // workout IDs
}

// Program definition
export interface Program {
  id: string;
  title: string;
  description: string;
  weeks: number;
  sessionsPerWeek: number;
  level: ExperienceLevel;
  equipmentRequired: EquipmentAccess;
  primaryGoal: TrainingGoal;
  weekStructure: WeekStructure[];
  progressionRulesRef: string;
}

// Completed exercise log
export interface CompletedExercise {
  exerciseId: string;
  completedSets: number;
  skipped: boolean;
  comments?: string;
}

// Session log (completed workout)
export interface SessionLog {
  id: string;
  userId: string;
  workoutId: string;
  programId?: string;
  date: string;
  durationMinutes: number;
  perceivedDifficulty: PerceivedDifficulty;
  notes: string[];
  completedExercises: CompletedExercise[];
  metricsOptional?: {
    jumpCm?: number;
    sprintMs?: number;
  };
  syncedAt?: string;
}

// Progress snapshot
export interface ProgressSnapshot {
  userId: string;
  date: string;
  consistencyStreak: number;
  sessionsThisWeek: number;
  targetSessionsPerWeek: number;
  lastActiveDate: string;
  currentProgramId?: string;
  programWeek?: number;
  badgesEarned: string[];
}

// User enrollment in a program
export interface ProgramEnrollment {
  id: string;
  userId: string;
  programId: string;
  startDate: string;
  currentWeek: number;
  currentSessionIndex: number;
  completedSessions: string[];
  status: 'active' | 'completed' | 'paused';
}

// Weekly plan item
export interface WeeklyPlanItem {
  date: string;
  dayOfWeek: number;
  workout?: Workout;
  isRestDay: boolean;
  isCompleted: boolean;
  sessionLogId?: string;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  WorkoutSession: { workoutId: string; programId?: string };
  ProgramDetail: { programId: string };
  ExerciseDetail: { exerciseId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Train: undefined;
  Programs: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Goals: undefined;
  Sport: undefined;
  Experience: undefined;
  Equipment: undefined;
  DaysPerWeek: undefined;
  Injuries: undefined;
  Complete: undefined;
};
