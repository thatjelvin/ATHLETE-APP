import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SelectionCard, ProgressDots } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { TRAINING_GOALS } from '../../constants/config';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList, TrainingGoal } from '../../models/types';

type GoalsScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Goals'>;
};

export const GoalsScreen: React.FC<GoalsScreenProps> = ({ navigation }) => {
  const { goals, toggleGoal } = useOnboardingStore();
  
  const handleContinue = () => {
    if (goals.length > 0) {
      navigation.navigate('Sport');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={0} />
      
      <View style={styles.content}>
        <Text style={styles.title}>What do you want to train?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {TRAINING_GOALS.map((goal) => (
            <SelectionCard
              key={goal.id}
              title={goal.label}
              description={goal.description}
              icon={goal.icon}
              selected={goals.includes(goal.id as TrainingGoal)}
              onPress={() => toggleGoal(goal.id as TrainingGoal)}
              multiSelect
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
          disabled={goals.length === 0}
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
    marginBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
