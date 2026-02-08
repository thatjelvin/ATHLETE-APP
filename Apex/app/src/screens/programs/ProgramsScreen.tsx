import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProgramCard } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { useWorkoutStore } from '../../store';
import type { RootStackParamList } from '../../models/types';

type ProgramsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const ProgramsScreen: React.FC<ProgramsScreenProps> = ({ navigation }) => {
  const { programs, currentEnrollment, loadSeedData } = useWorkoutStore();
  
  useEffect(() => {
    if (programs.length === 0) {
      loadSeedData();
    }
  }, []);
  
  const handleProgramPress = (programId: string) => {
    navigation.navigate('ProgramDetail', { programId });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Training Programs</Text>
          <Text style={styles.subtitle}>
            Choose a program that matches your goals
          </Text>
        </View>
        
        {currentEnrollment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Program</Text>
            {programs
              .filter(p => p.id === currentEnrollment.programId)
              .map(program => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  onPress={() => handleProgramPress(program.id)}
                  isEnrolled
                />
              ))}
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentEnrollment ? 'Other Programs' : 'All Programs'}
          </Text>
          {programs
            .filter(p => !currentEnrollment || p.id !== currentEnrollment.programId)
            .map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                onPress={() => handleProgramPress(program.id)}
              />
            ))}
        </View>
        
        {programs.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyText}>
              No programs available yet. Check back soon!
            </Text>
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
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
});
