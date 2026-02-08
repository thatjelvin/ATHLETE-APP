import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../constants/theme';
import { DAYS_OF_WEEK } from '../constants/config';
import type { WeeklyPlanItem } from '../models/types';

interface WeeklyPlanScrollerProps {
  weeklyPlan: WeeklyPlanItem[];
  onDayPress: (item: WeeklyPlanItem) => void;
  selectedDate?: string;
}

export const WeeklyPlanScroller: React.FC<WeeklyPlanScrollerProps> = ({
  weeklyPlan,
  onDayPress,
  selectedDate,
}) => {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Week</Text>
      <View style={styles.daysContainer}>
        {weeklyPlan.map((item) => {
          const isToday = item.date === today;
          const isSelected = item.date === selectedDate;
          const day = DAYS_OF_WEEK[item.dayOfWeek];
          const dayNumber = new Date(item.date).getDate();
          
          return (
            <TouchableOpacity
              key={item.date}
              style={[
                styles.dayItem,
                isToday && styles.today,
                isSelected && styles.selected,
                item.isCompleted && styles.completed,
              ]}
              onPress={() => onDayPress(item)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dayName,
                isToday && styles.todayText,
                isSelected && styles.selectedText,
              ]}>
                {day.short}
              </Text>
              <Text style={[
                styles.dayNumber,
                isToday && styles.todayText,
                isSelected && styles.selectedText,
              ]}>
                {dayNumber}
              </Text>
              {!item.isRestDay && (
                <View style={[
                  styles.indicator,
                  item.isCompleted ? styles.completedIndicator : styles.scheduledIndicator,
                ]} />
              )}
              {item.isCompleted && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    minWidth: 44,
    backgroundColor: colors.backgroundCard,
  },
  today: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  completed: {
    backgroundColor: colors.backgroundElevated,
  },
  dayName: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.xs,
  },
  dayNumber: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  todayText: {
    color: colors.primary,
  },
  selectedText: {
    color: colors.text,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    marginTop: spacing.xs,
  },
  scheduledIndicator: {
    backgroundColor: colors.primary,
  },
  completedIndicator: {
    backgroundColor: colors.success,
  },
  checkmark: {
    color: colors.success,
    fontSize: 10,
    marginTop: spacing.xs,
  },
});
