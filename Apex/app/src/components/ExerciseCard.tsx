import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing, shadows } from '../constants/theme';
import type { Exercise, WorkoutExercise } from '../models/types';

interface ExerciseCardProps {
  exercise: Exercise;
  workoutExercise: WorkoutExercise;
  onPress?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  workoutExercise,
  onPress,
  isActive = false,
  isCompleted = false,
}) => {
  const getTargetDisplay = () => {
    switch (workoutExercise.targetType) {
      case 'reps':
        return `${workoutExercise.sets} × ${workoutExercise.reps} reps`;
      case 'seconds':
        return `${workoutExercise.sets} × ${workoutExercise.duration}s`;
      case 'distance':
        return `${workoutExercise.sets} × ${workoutExercise.distance}`;
      default:
        return `${workoutExercise.sets} sets`;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.active,
        isCompleted && styles.completed,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{exercise.name}</Text>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        
        <Text style={styles.target}>{getTargetDisplay()}</Text>
        
        <View style={styles.tags}>
          {exercise.intents.slice(0, 2).map((intent, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{intent}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.rest}>Rest: {workoutExercise.restSeconds}s</Text>
      </View>
      
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Difficulty</Text>
        <View style={styles.difficultyBar}>
          <View
            style={[
              styles.difficultyFill,
              { width: `${(exercise.difficulty / 10) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.difficultyValue}>{exercise.difficulty}/10</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  active: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.backgroundElevated,
  },
  completed: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
    marginRight: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  checkmark: {
    color: colors.success,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  target: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.backgroundElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  rest: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  difficultyContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  difficultyLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.xs,
  },
  difficultyBar: {
    width: 60,
    height: 4,
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  difficultyFill: {
    height: '100%',
    backgroundColor: colors.warning,
    borderRadius: borderRadius.full,
  },
  difficultyValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});
