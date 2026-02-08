import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ProgressRing } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useWorkoutStore, useUserStore } from '../../store';

export const ProgressScreen: React.FC = () => {
  const { profile } = useUserStore();
  const { sessionLogs, currentEnrollment, programs } = useWorkoutStore();
  
  const currentProgram = currentEnrollment
    ? programs.find(p => p.id === currentEnrollment.programId)
    : null;
  
  // Calculate stats
  const totalSessions = sessionLogs.length;
  const sessionsThisWeek = sessionLogs.filter(log => {
    const logDate = new Date(log.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return logDate >= weekAgo;
  }).length;
  
  const targetSessionsPerWeek = profile?.daysPerWeek || 3;
  const weeklyProgress = Math.min(sessionsThisWeek / targetSessionsPerWeek, 1);
  
  // Calculate streak
  const calculateStreak = () => {
    if (sessionLogs.length === 0) return 0;
    
    const sortedLogs = [...sessionLogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const hasSession = sortedLogs.some(
        log => log.date.split('T')[0] === dateString
      );
      
      if (hasSession) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  
  // Difficulty distribution
  const difficultyStats = {
    easy: sessionLogs.filter(l => l.perceivedDifficulty === 'easy').length,
    good: sessionLogs.filter(l => l.perceivedDifficulty === 'good').length,
    hard: sessionLogs.filter(l => l.perceivedDifficulty === 'hard').length,
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Keep pushing your limits!</Text>
        </View>
        
        <View style={styles.mainStats}>
          <View style={styles.ringContainer}>
            <ProgressRing
              progress={weeklyProgress}
              size={140}
              strokeWidth={12}
              value={`${sessionsThisWeek}/${targetSessionsPerWeek}`}
              label="This Week"
            />
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak 🔥</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalSessions}</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
          </View>
        </View>
        
        {currentProgram && currentEnrollment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Program Progress</Text>
            <View style={styles.programCard}>
              <Text style={styles.programName}>{currentProgram.title}</Text>
              <Text style={styles.programWeek}>
                Week {currentEnrollment.currentWeek} of {currentProgram.weeks}
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(currentEnrollment.completedSessions.length / (currentProgram.weeks * currentProgram.sessionsPerWeek)) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {currentEnrollment.completedSessions.length}/{currentProgram.weeks * currentProgram.sessionsPerWeek} sessions
                </Text>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Intensity</Text>
          <View style={styles.intensityContainer}>
            <View style={styles.intensityItem}>
              <View style={[styles.intensityBar, { backgroundColor: colors.difficultyEasy }]}>
                <Text style={styles.intensityValue}>{difficultyStats.easy}</Text>
              </View>
              <Text style={styles.intensityLabel}>Easy</Text>
            </View>
            <View style={styles.intensityItem}>
              <View style={[styles.intensityBar, { backgroundColor: colors.difficultyGood }]}>
                <Text style={styles.intensityValue}>{difficultyStats.good}</Text>
              </View>
              <Text style={styles.intensityLabel}>Good</Text>
            </View>
            <View style={styles.intensityItem}>
              <View style={[styles.intensityBar, { backgroundColor: colors.difficultyHard }]}>
                <Text style={styles.intensityValue}>{difficultyStats.hard}</Text>
              </View>
              <Text style={styles.intensityLabel}>Hard</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {sessionLogs.length > 0 ? (
            sessionLogs.slice(-5).reverse().map((log, index) => (
              <View key={log.id} style={styles.activityItem}>
                <View style={styles.activityDate}>
                  <Text style={styles.activityDay}>
                    {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={styles.activityDateNum}>
                    {new Date(log.date).getDate()}
                  </Text>
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityTitle}>Workout Completed</Text>
                  <Text style={styles.activityMeta}>
                    {log.durationMinutes} min • {log.perceivedDifficulty}
                  </Text>
                </View>
                <View style={[
                  styles.difficultyDot,
                  { backgroundColor: 
                    log.perceivedDifficulty === 'easy' ? colors.difficultyEasy :
                    log.perceivedDifficulty === 'good' ? colors.difficultyGood :
                    colors.difficultyHard
                  }
                ]} />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📊</Text>
              <Text style={styles.emptyText}>
                Complete your first workout to see your progress!
              </Text>
            </View>
          )}
        </View>
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
  mainStats: {
    marginBottom: spacing.xl,
  },
  ringContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    color: colors.primary,
    fontSize: typography.fontSize.xxxl,
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
  programCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  programName: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  programWeek: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  progressBarContainer: {
    gap: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  intensityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  intensityItem: {
    alignItems: 'center',
  },
  intensityBar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  intensityValue: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  intensityLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  activityDate: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    marginRight: spacing.md,
    minWidth: 50,
  },
  activityDay: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
  },
  activityDateNum: {
    color: colors.text,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  activityMeta: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  difficultyDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
