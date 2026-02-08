import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button, ExerciseCard, PerceivedDifficultyPicker } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useWorkoutStore } from '../../store';
import type { RootStackParamList, PerceivedDifficulty } from '../../models/types';

type WorkoutSessionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WorkoutSession'>;
  route: RouteProp<RootStackParamList, 'WorkoutSession'>;
};

type SessionPhase = 'preview' | 'exercise' | 'rest' | 'feedback' | 'complete';

export const WorkoutSessionScreen: React.FC<WorkoutSessionScreenProps> = ({ navigation, route }) => {
  const { workoutId } = route.params;
  const {
    getWorkoutById,
    getExerciseById,
    startWorkout,
    activeWorkout,
    currentExerciseIndex,
    nextExercise,
    prevExercise,
    completeExercise,
    completeWorkout,
    cancelWorkout,
    completedExercises,
  } = useWorkoutStore();
  
  const [phase, setPhase] = useState<SessionPhase>('preview');
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [perceivedDifficulty, setPerceivedDifficulty] = useState<PerceivedDifficulty | undefined>();
  
  const workout = getWorkoutById(workoutId);
  
  useEffect(() => {
    if (phase === 'rest' && restTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setRestTimeRemaining(restTimeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'rest' && restTimeRemaining === 0) {
      handleNextSet();
    }
  }, [phase, restTimeRemaining]);
  
  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Workout not found</Text>
      </SafeAreaView>
    );
  }
  
  const currentWorkoutExercise = activeWorkout?.exercises[currentExerciseIndex];
  const currentExercise = currentWorkoutExercise
    ? getExerciseById(currentWorkoutExercise.exerciseId)
    : null;
  
  const totalExercises = workout.exercises.length;
  const isLastExercise = currentExerciseIndex === totalExercises - 1;
  const isLastSet = currentSetIndex === (currentWorkoutExercise?.sets || 1) - 1;
  
  const handleStartWorkout = () => {
    startWorkout(workoutId);
    setPhase('exercise');
    setCurrentSetIndex(0);
  };
  
  const handleCompleteSet = () => {
    if (!currentWorkoutExercise || !currentExercise) return;
    
    if (isLastSet) {
      // Completed all sets for this exercise
      completeExercise(currentExercise.id, currentWorkoutExercise.sets);
      
      if (isLastExercise) {
        setPhase('feedback');
      } else {
        setRestTimeRemaining(currentWorkoutExercise.restSeconds);
        setPhase('rest');
      }
    } else {
      // Start rest before next set
      setRestTimeRemaining(currentWorkoutExercise.restSeconds);
      setPhase('rest');
    }
  };
  
  const handleNextSet = () => {
    if (!currentWorkoutExercise) return;
    
    if (isLastSet) {
      // Move to next exercise
      nextExercise();
      setCurrentSetIndex(0);
    } else {
      setCurrentSetIndex(currentSetIndex + 1);
    }
    setPhase('exercise');
  };
  
  const handleSkipRest = () => {
    setRestTimeRemaining(0);
    handleNextSet();
  };
  
  const handleSkipExercise = () => {
    if (!currentWorkoutExercise || !currentExercise) return;
    
    completeExercise(currentExercise.id, 0, true);
    
    if (isLastExercise) {
      setPhase('feedback');
    } else {
      nextExercise();
      setCurrentSetIndex(0);
    }
  };
  
  const handleFinishWorkout = () => {
    if (!perceivedDifficulty) {
      Alert.alert('Rate Your Workout', 'Please select how the workout felt before finishing.');
      return;
    }
    
    completeWorkout(perceivedDifficulty);
    setPhase('complete');
  };
  
  const handleExitSession = () => {
    Alert.alert(
      'Exit Workout?',
      'Your progress will not be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            cancelWorkout();
            navigation.goBack();
          },
        },
      ]
    );
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getTargetDisplay = () => {
    if (!currentWorkoutExercise) return '';
    
    switch (currentWorkoutExercise.targetType) {
      case 'reps':
        return `${currentWorkoutExercise.reps} reps`;
      case 'seconds':
        return `${currentWorkoutExercise.duration} seconds`;
      case 'distance':
        return currentWorkoutExercise.distance || '';
      default:
        return '';
    }
  };
  
  // Preview phase
  if (phase === 'preview') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.previewContent}>
          <Text style={styles.previewTitle}>{workout.title}</Text>
          <Text style={styles.previewGoal}>{workout.goal}</Text>
          
          <View style={styles.previewStats}>
            <View style={styles.previewStatItem}>
              <Text style={styles.previewStatValue}>{workout.durationEstimateMinutes}</Text>
              <Text style={styles.previewStatLabel}>minutes</Text>
            </View>
            <View style={styles.previewStatItem}>
              <Text style={styles.previewStatValue}>{workout.exercises.length}</Text>
              <Text style={styles.previewStatLabel}>exercises</Text>
            </View>
            <View style={styles.previewStatItem}>
              <Text style={styles.previewStatValue}>{workout.intensityScore}/10</Text>
              <Text style={styles.previewStatLabel}>intensity</Text>
            </View>
          </View>
          
          <Text style={styles.exerciseListTitle}>Exercises</Text>
          {workout.exercises.map((ex, index) => {
            const exercise = getExerciseById(ex.exerciseId);
            if (!exercise) return null;
            return (
              <ExerciseCard
                key={index}
                exercise={exercise}
                workoutExercise={ex}
              />
            );
          })}
        </View>
        
        <View style={styles.footer}>
          <Button
            title="START WORKOUT"
            onPress={handleStartWorkout}
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // Rest phase
  if (phase === 'rest') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.restContent}>
          <Text style={styles.restTitle}>Rest</Text>
          <Text style={styles.restTimer}>{formatTime(restTimeRemaining)}</Text>
          <Text style={styles.restNext}>
            {isLastSet ? 'Next: ' + (getExerciseById(workout.exercises[currentExerciseIndex + 1]?.exerciseId)?.name || 'Finish') : `Next: Set ${currentSetIndex + 2}`}
          </Text>
          
          <Button
            title="SKIP REST"
            onPress={handleSkipRest}
            variant="outline"
            style={styles.skipButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // Feedback phase
  if (phase === 'feedback') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.feedbackContent}>
          <Text style={styles.feedbackTitle}>Great Work! 💪</Text>
          <Text style={styles.feedbackSubtitle}>You completed the workout</Text>
          
          <PerceivedDifficultyPicker
            value={perceivedDifficulty}
            onChange={setPerceivedDifficulty}
          />
        </View>
        
        <View style={styles.footer}>
          <Button
            title="FINISH WORKOUT"
            onPress={handleFinishWorkout}
            size="large"
            disabled={!perceivedDifficulty}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // Complete phase
  if (phase === 'complete') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContent}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeTitle}>Workout Complete!</Text>
          <Text style={styles.completeSubtitle}>
            Keep up the great work. Consistency is key!
          </Text>
          
          <View style={styles.completeSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workout.exercises.length}</Text>
              <Text style={styles.summaryLabel}>Exercises</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {completedExercises.filter(e => !e.skipped).length}
              </Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button
            title="DONE"
            onPress={() => navigation.goBack()}
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // Exercise phase
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitSession}>
          <Text style={styles.exitButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.exerciseProgress}>
          {currentExerciseIndex + 1}/{totalExercises}
        </Text>
        <View style={{ width: 30 }} />
      </View>
      
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentExerciseIndex + 1) / totalExercises) * 100}%` },
          ]}
        />
      </View>
      
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseName}>{currentExercise?.name}</Text>
        
        <View style={styles.setIndicator}>
          <Text style={styles.setNumber}>
            Set {currentSetIndex + 1} of {currentWorkoutExercise?.sets}
          </Text>
        </View>
        
        <View style={styles.targetContainer}>
          <Text style={styles.targetValue}>{getTargetDisplay()}</Text>
        </View>
        
        <View style={styles.cuesContainer}>
          <Text style={styles.cuesTitle}>Form Cues</Text>
          {currentExercise?.cues.map((cue, index) => (
            <Text key={index} style={styles.cue}>• {cue}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button
            title="SKIP"
            onPress={handleSkipExercise}
            variant="ghost"
            style={styles.skipExerciseButton}
          />
          <Button
            title={isLastSet && isLastExercise ? "FINISH" : "DONE"}
            onPress={handleCompleteSet}
            style={styles.completeButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
  },
  exitButton: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xl,
  },
  exerciseProgress: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundElevated,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  previewContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  previewTitle: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  previewGoal: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xl,
  },
  previewStats: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  previewStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  previewStatValue: {
    color: colors.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  previewStatLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  exerciseListTitle: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
  },
  exerciseContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  exerciseName: {
    color: colors.text,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  setIndicator: {
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xl,
  },
  setNumber: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
  },
  targetContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xxl,
    marginBottom: spacing.xl,
  },
  targetValue: {
    color: colors.text,
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
  },
  cuesContainer: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '100%',
  },
  cuesTitle: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  cue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xs,
  },
  restContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  restTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.md,
  },
  restTimer: {
    color: colors.primary,
    fontSize: 80,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  restNext: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xxl,
  },
  skipButton: {
    minWidth: 150,
  },
  feedbackContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  feedbackTitle: {
    color: colors.text,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  feedbackSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xxl,
  },
  completeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  completeEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  completeTitle: {
    color: colors.text,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  completeSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  completeSummary: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.xxl,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    color: colors.primary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  skipExerciseButton: {
    flex: 1,
  },
  completeButton: {
    flex: 2,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
