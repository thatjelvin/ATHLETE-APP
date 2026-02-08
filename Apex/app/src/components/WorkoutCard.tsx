import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing, shadows } from '../constants/theme';
import type { Workout, Exercise } from '../models/types';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  exercises?: Exercise[];
  isCompleted?: boolean;
  isToday?: boolean;
}

const getSessionTypeColor = (type: string) => {
  switch (type) {
    case 'power':
      return colors.error;
    case 'speed':
      return colors.accentYellow;
    case 'technique':
      return colors.accentBlue;
    case 'strength':
      return colors.accent;
    case 'recovery':
      return colors.accentGreen;
    default:
      return colors.textSecondary;
  }
};

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onPress,
  exercises = [],
  isCompleted = false,
  isToday = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCompleted && styles.completed,
        isToday && styles.today,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isCompleted}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{workout.title}</Text>
          <Text style={styles.goal}>{workout.goal}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getSessionTypeColor(workout.sessionType) }]}>
          <Text style={styles.typeText}>{workout.sessionType.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{workout.durationEstimateMinutes}</Text>
          <Text style={styles.statLabel}>min</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{workout.exercises.length}</Text>
          <Text style={styles.statLabel}>exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{workout.intensityScore}/10</Text>
          <Text style={styles.statLabel}>intensity</Text>
        </View>
      </View>
      
      {exercises.length > 0 && (
        <View style={styles.exerciseList}>
          {workout.exercises.slice(0, 3).map((workoutExercise, index) => {
            const exercise = exercises.find(e => e.id === workoutExercise.exerciseId);
            return (
              <Text key={index} style={styles.exerciseName} numberOfLines={1}>
                • {exercise?.name || 'Unknown Exercise'}
              </Text>
            );
          })}
          {workout.exercises.length > 3 && (
            <Text style={styles.moreExercises}>
              +{workout.exercises.length - 3} more
            </Text>
          )}
        </View>
      )}
      
      {isCompleted && (
        <View style={styles.completedOverlay}>
          <Text style={styles.completedText}>✓ COMPLETED</Text>
        </View>
      )}
      
      {isToday && !isCompleted && (
        <View style={styles.todayBadge}>
          <Text style={styles.todayText}>TODAY</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  completed: {
    opacity: 0.6,
  },
  today: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  goal: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  exerciseList: {
    marginTop: spacing.sm,
  },
  exerciseName: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  moreExercises: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontStyle: 'italic',
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.overlay,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: colors.success,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  todayBadge: {
    position: 'absolute',
    top: -10,
    right: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  todayText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
});
