import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SelectionCard, ProgressDots } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { INJURY_FLAGS } from '../../constants/config';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList, InjuryFlag } from '../../models/types';

type InjuriesScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Injuries'>;
};

export const InjuriesScreen: React.FC<InjuriesScreenProps> = ({ navigation }) => {
  const { injuryFlags, toggleInjuryFlag } = useOnboardingStore();
  
  const handleContinue = () => {
    navigation.navigate('Complete');
  };
  
  const handleSkip = () => {
    navigation.navigate('Complete');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={5} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Any injuries or limitations?</Text>
        <Text style={styles.subtitle}>
          We'll modify exercises to keep you safe. Select all that apply.
        </Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {INJURY_FLAGS.map((flag) => (
            <SelectionCard
              key={flag.id}
              title={flag.label}
              selected={injuryFlags.includes(flag.id as InjuryFlag)}
              onPress={() => toggleInjuryFlag(flag.id as InjuryFlag)}
              multiSelect
            />
          ))}
        </ScrollView>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ This app is not a substitute for medical advice. Consult a healthcare professional before starting any exercise program.
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
          size="large"
        />
        <Button
          title="No limitations"
          onPress={handleSkip}
          variant="ghost"
          style={styles.skipButton}
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
  disclaimer: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  disclaimerText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * 1.5,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  skipButton: {
    marginTop: spacing.sm,
  },
});
