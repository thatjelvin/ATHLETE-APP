import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing, shadows } from '../constants/theme';
import type { Program } from '../models/types';

interface ProgramCardProps {
  program: Program;
  onPress: () => void;
  isEnrolled?: boolean;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return colors.success;
    case 'intermediate':
      return colors.warning;
    case 'advanced':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const getGoalIcon = (goal: string) => {
  switch (goal) {
    case 'speed':
      return '⚡';
    case 'vertical_jump':
      return '🚀';
    case 'explosiveness':
      return '💥';
    default:
      return '🏃';
  }
};

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onPress,
  isEnrolled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isEnrolled && styles.enrolled]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{getGoalIcon(program.primaryGoal)}</Text>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(program.level) }]}>
          <Text style={styles.levelText}>{program.level.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{program.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {program.description}
      </Text>
      
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={styles.metaText}>{program.weeks} weeks</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🏋️</Text>
          <Text style={styles.metaText}>{program.sessionsPerWeek}x/week</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📦</Text>
          <Text style={styles.metaText}>{program.equipmentRequired}</Text>
        </View>
      </View>
      
      {isEnrolled && (
        <View style={styles.enrolledBadge}>
          <Text style={styles.enrolledText}>ACTIVE</Text>
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
  enrolled: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 32,
  },
  levelBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  levelText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  enrolledBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  enrolledText: {
    color: colors.text,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
});
