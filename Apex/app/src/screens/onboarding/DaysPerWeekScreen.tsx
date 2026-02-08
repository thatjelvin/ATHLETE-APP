import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ProgressDots } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList } from '../../models/types';

type DaysPerWeekScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'DaysPerWeek'>;
};

const DAYS_OPTIONS = [2, 3, 4, 5, 6];

export const DaysPerWeekScreen: React.FC<DaysPerWeekScreenProps> = ({ navigation }) => {
  const { daysPerWeek, setDaysPerWeek } = useOnboardingStore();
  
  const handleContinue = () => {
    navigation.navigate('Injuries');
  };
  
  const getRecommendation = (days: number) => {
    if (days <= 2) return 'Light training';
    if (days <= 3) return 'Recommended';
    if (days <= 4) return 'Moderate';
    return 'Intense';
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={4} />
      
      <View style={styles.content}>
        <Text style={styles.title}>How many days per week can you train?</Text>
        <Text style={styles.subtitle}>We'll build your plan around your schedule</Text>
        
        <View style={styles.optionsContainer}>
          {DAYS_OPTIONS.map((days) => (
            <TouchableOpacity
              key={days}
              style={[
                styles.dayOption,
                daysPerWeek === days && styles.dayOptionSelected,
              ]}
              onPress={() => setDaysPerWeek(days)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dayNumber,
                daysPerWeek === days && styles.dayNumberSelected,
              ]}>
                {days}
              </Text>
              <Text style={[
                styles.dayLabel,
                daysPerWeek === days && styles.dayLabelSelected,
              ]}>
                days
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.recommendation}>
          <Text style={styles.recommendationLabel}>Training intensity:</Text>
          <Text style={styles.recommendationValue}>{getRecommendation(daysPerWeek)}</Text>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.infoText}>
            💡 3-4 days per week is optimal for most athletes to see gains while allowing adequate recovery.
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
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
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  dayOption: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xs,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundElevated,
  },
  dayNumber: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  dayNumberSelected: {
    color: colors.primary,
  },
  dayLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  dayLabelSelected: {
    color: colors.primary,
  },
  recommendation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  recommendationLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginRight: spacing.sm,
  },
  recommendationValue: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  info: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
