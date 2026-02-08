import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SelectionCard, ProgressDots } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { EXPERIENCE_LEVELS } from '../../constants/config';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList, ExperienceLevel } from '../../models/types';

type ExperienceScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Experience'>;
};

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ navigation }) => {
  const { experience, setExperience } = useOnboardingStore();
  
  const handleSelect = (level: ExperienceLevel) => {
    setExperience(level);
  };
  
  const handleContinue = () => {
    if (experience) {
      navigation.navigate('Equipment');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={2} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Your training experience?</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {EXPERIENCE_LEVELS.map((level) => (
            <SelectionCard
              key={level.id}
              title={level.label}
              description={level.description}
              icon={level.icon}
              selected={experience === level.id}
              onPress={() => handleSelect(level.id as ExperienceLevel)}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
          disabled={!experience}
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
