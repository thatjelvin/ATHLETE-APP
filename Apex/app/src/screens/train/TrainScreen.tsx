import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, WorkoutCard, WeeklyPlanScroller } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { useWorkoutStore, useUserStore } from '../../store';
import type { RootStackParamList, WeeklyPlanItem } from '../../models/types';

type TrainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const TrainScreen: React.FC<TrainScreenProps> = ({ navigation }) => {
  const { profile } = useUserStore();
  const {
    weeklyPlan,
    exercises,
    currentEnrollment,
    programs,
    generateWeeklyPlan,
    getTodayWorkout,
  } = useWorkoutStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  
  const todayWorkout = getTodayWorkout();
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    if (weeklyPlan.length === 0) {
      generateWeeklyPlan();
    }
  }, []);
  
  const onRefresh = () => {
    setRefreshing(true);
    generateWeeklyPlan();
    setTimeout(() => setRefreshing(false), 500);
  };
  
  const handleDayPress = (item: WeeklyPlanItem) => {
    setSelectedDate(item.date);
  };
  
  const handleStartWorkout = (workoutId: string) => {
    navigation.navigate('WorkoutSession', { workoutId });
  };
  
  const currentProgram = currentEnrollment
    ? programs.find(p => p.id === currentEnrollment.programId)
    : null;
  
  const selectedPlanItem = weeklyPlan.find(item => item.date === (selectedDate || today));
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hey{profile?.name ? `, ${profile.name}` : ''}! 👋
          </Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        
        {currentProgram && currentEnrollment && (
          <View style={styles.programStatus}>
            <Text style={styles.programName}>{currentProgram.title}</Text>
            <Text style={styles.programProgress}>
              Week {currentEnrollment.currentWeek} of {currentProgram.weeks}
            </Text>
          </View>
        )}
        
        <WeeklyPlanScroller
          weeklyPlan={weeklyPlan}
          onDayPress={handleDayPress}
          selectedDate={selectedDate || today}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedDate === today || !selectedDate ? "Today's Workout" : 'Selected Workout'}
          </Text>
          
          {selectedPlanItem?.workout ? (
            <WorkoutCard
              workout={selectedPlanItem.workout}
              exercises={exercises}
              onPress={() => handleStartWorkout(selectedPlanItem.workout!.id)}
              isToday={selectedPlanItem.date === today}
              isCompleted={selectedPlanItem.isCompleted}
            />
          ) : selectedPlanItem?.isRestDay ? (
            <View style={styles.restDay}>
              <Text style={styles.restDayEmoji}>😴</Text>
              <Text style={styles.restDayTitle}>Rest Day</Text>
              <Text style={styles.restDayText}>
                Recovery is just as important as training. Take it easy today!
              </Text>
            </View>
          ) : (
            <View style={styles.noWorkout}>
              <Text style={styles.noWorkoutText}>
                No workout scheduled. Browse programs to get started!
              </Text>
              <Button
                title="BROWSE PROGRAMS"
                onPress={() => navigation.navigate('MainTabs' as any)}
                variant="outline"
                style={styles.browseButton}
              />
            </View>
          )}
        </View>
        
        {!currentEnrollment && (
          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Ready to get started?</Text>
            <Text style={styles.ctaText}>
              Choose a program to begin your athletic training journey
            </Text>
            <Button
              title="VIEW PROGRAMS"
              onPress={() => navigation.navigate('MainTabs' as any)}
              style={styles.ctaButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  greeting: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  date: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
  },
  programStatus: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  programName: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  programProgress: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  restDay: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
  },
  restDayEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  restDayTitle: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  restDayText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  noWorkout: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
  },
  noWorkoutText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  browseButton: {
    minWidth: 200,
  },
  cta: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  ctaTitle: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  ctaText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ctaButton: {
    minWidth: 200,
  },
});
