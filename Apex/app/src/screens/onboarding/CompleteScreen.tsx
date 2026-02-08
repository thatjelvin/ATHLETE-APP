import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Button, ProgressDots } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { useOnboardingStore, useUserStore, useWorkoutStore } from '../../store';
import type { OnboardingStackParamList } from '../../models/types';

type CompleteScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Complete'>;
};

export const CompleteScreen: React.FC<CompleteScreenProps> = ({ navigation }) => {
  const onboardingState = useOnboardingStore();
  const { updateProfile, completeOnboarding } = useUserStore();
  const { loadSeedData, generateWeeklyPlan } = useWorkoutStore();
  
  const handleStart = () => {
    // Save user profile from onboarding data
    updateProfile({
      goals: onboardingState.goals,
      sport: onboardingState.sport || undefined,
      experience: onboardingState.experience || 'beginner',
      equipment: onboardingState.equipment || 'bodyweight',
      daysPerWeek: onboardingState.daysPerWeek,
      injuryFlags: onboardingState.injuryFlags,
    });
    
    // Mark onboarding as complete
    completeOnboarding();
    
    // Load seed data and generate weekly plan
    loadSeedData();
    generateWeeklyPlan();
    
    // Reset onboarding state
    onboardingState.resetOnboarding();
    
    // Navigate to main app
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' as any }],
      })
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={6} />
      
      <View style={styles.content}>
        <View style={styles.celebration}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>You're all set!</Text>
          <Text style={styles.subtitle}>
            We've created a personalized training plan based on your goals
          </Text>
        </View>
        
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Your Profile Summary</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Goals:</Text>
            <Text style={styles.summaryValue}>
              {onboardingState.goals.join(', ') || 'Not set'}
            </Text>
          </View>
          
          {onboardingState.sport && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Sport:</Text>
              <Text style={styles.summaryValue}>{onboardingState.sport}</Text>
            </View>
          )}
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Experience:</Text>
            <Text style={styles.summaryValue}>
              {onboardingState.experience || 'Beginner'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Training Days:</Text>
            <Text style={styles.summaryValue}>
              {onboardingState.daysPerWeek} days/week
            </Text>
          </View>
        </View>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureText}>Personalized weekly plan</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureText}>Progress tracking</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Works offline</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="START TRAINING"
          onPress={handleStart}
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  celebration: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  summary: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
  },
  summaryValue: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'capitalize',
  },
  features: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  featureText: {
    color: colors.text,
    fontSize: typography.fontSize.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
