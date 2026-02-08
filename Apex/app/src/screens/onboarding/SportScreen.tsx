import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SelectionCard, ProgressDots } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { SPORTS } from '../../constants/config';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList } from '../../models/types';

type SportScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Sport'>;
};

export const SportScreen: React.FC<SportScreenProps> = ({ navigation }) => {
  const { sport, setSport } = useOnboardingStore();
  const [customSport, setCustomSport] = useState('');
  
  const handleSelect = (selectedSport: string) => {
    if (selectedSport === 'Other') {
      setSport(customSport || null);
    } else {
      setSport(selectedSport);
      setCustomSport('');
    }
  };
  
  const handleContinue = () => {
    navigation.navigate('Experience');
  };
  
  const handleSkip = () => {
    setSport(null);
    navigation.navigate('Experience');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={1} />
      
      <View style={styles.content}>
        <Text style={styles.title}>What's your sport?</Text>
        <Text style={styles.subtitle}>(Optional)</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {SPORTS.map((sportOption) => (
            <SelectionCard
              key={sportOption}
              title={sportOption}
              selected={sport === sportOption || (sportOption === 'Other' && customSport.length > 0)}
              onPress={() => handleSelect(sportOption)}
            />
          ))}
          
          {(sport === 'Other' || customSport.length > 0) && (
            <TextInput
              style={styles.input}
              placeholder="Enter your sport..."
              placeholderTextColor={colors.textMuted}
              value={customSport}
              onChangeText={(text) => {
                setCustomSport(text);
                setSport(text || null);
              }}
            />
          )}
        </ScrollView>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
          size="large"
        />
        <Button
          title="Skip for now"
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
    marginBottom: spacing.xs,
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
  input: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.fontSize.md,
    marginTop: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  skipButton: {
    marginTop: spacing.sm,
  },
});
