import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useWorkoutStore } from '../../store';
import type { RootStackParamList } from '../../models/types';

type ProgramDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProgramDetail'>;
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return colors.success;
    case 'intermediate': return colors.warning;
    case 'advanced': return colors.error;
    default: return colors.textSecondary;
  }
};

const getGoalIcon = (goal: string) => {
  switch (goal) {
    case 'speed': return '⚡';
    case 'vertical_jump': return '🚀';
    case 'explosiveness': return '💥';
    default: return '🏃';
  }
};

export const ProgramDetailScreen: React.FC<ProgramDetailScreenProps> = ({ navigation, route }) => {
  const { programId } = route.params;
  const { getProgramById, enrollInProgram, unenrollFromProgram, currentEnrollment, generateWeeklyPlan } = useWorkoutStore();
  
  const program = getProgramById(programId);
  const isEnrolled = currentEnrollment?.programId === programId;
  
  if (!program) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Program not found</Text>
      </SafeAreaView>
    );
  }
  
  const handleEnroll = () => {
    if (currentEnrollment && !isEnrolled) {
      Alert.alert(
        'Switch Programs?',
        'You are already enrolled in a program. Do you want to switch to this one?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Switch',
            onPress: () => {
              enrollInProgram(programId);
              generateWeeklyPlan();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      enrollInProgram(programId);
      generateWeeklyPlan();
      navigation.goBack();
    }
  };
  
  const handleUnenroll = () => {
    Alert.alert(
      'Leave Program?',
      'Are you sure you want to leave this program? Your progress will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            unenrollFromProgram();
            generateWeeklyPlan();
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.icon}>{getGoalIcon(program.primaryGoal)}</Text>
          <Text style={styles.title}>{program.title}</Text>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(program.level) }]}>
            <Text style={styles.levelText}>{program.level.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{program.description}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.weeks}</Text>
            <Text style={styles.statLabel}>Weeks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.sessionsPerWeek}</Text>
            <Text style={styles.statLabel}>Sessions/Week</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{program.weeks * program.sessionsPerWeek}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
          <View style={styles.equipmentBadge}>
            <Text style={styles.equipmentText}>
              {program.equipmentRequired === 'bodyweight' ? '🏠 Bodyweight Only' :
               program.equipmentRequired === 'minimal' ? '📦 Minimal Equipment' :
               '🏋️ Full Gym'}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Week by Week</Text>
          {program.weekStructure.map((week) => (
            <View key={week.weekNumber} style={styles.weekItem}>
              <View style={styles.weekHeader}>
                <Text style={styles.weekNumber}>Week {week.weekNumber}</Text>
                <Text style={styles.weekTheme}>{week.theme}</Text>
              </View>
              <Text style={styles.weekSessions}>
                {week.sessions.length} sessions
              </Text>
            </View>
          ))}
        </View>
        
        {isEnrolled && currentEnrollment && (
          <View style={styles.progressSection}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentEnrollment.completedSessions.length / (program.weeks * program.sessionsPerWeek)) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentEnrollment.completedSessions.length} of {program.weeks * program.sessionsPerWeek} sessions completed
            </Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        {isEnrolled ? (
          <View style={styles.enrolledFooter}>
            <View style={styles.enrolledBadge}>
              <Text style={styles.enrolledText}>✓ Currently Enrolled</Text>
            </View>
            <Button
              title="LEAVE PROGRAM"
              onPress={handleUnenroll}
              variant="outline"
            />
          </View>
        ) : (
          <Button
            title="START PROGRAM"
            onPress={handleEnroll}
            size="large"
          />
        )}
      </View>
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
    alignItems: 'center',
    paddingTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  icon: {
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
  levelBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  levelText: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    marginBottom: spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  statValue: {
    color: colors.primary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
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
  equipmentBadge: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  equipmentText: {
    color: colors.text,
    fontSize: typography.fontSize.md,
  },
  weekItem: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekHeader: {
    flex: 1,
  },
  weekNumber: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  weekTheme: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  weekSessions: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  progressSection: {
    marginBottom: spacing.xl,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  enrolledFooter: {
    gap: spacing.md,
  },
  enrolledBadge: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  enrolledText: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
