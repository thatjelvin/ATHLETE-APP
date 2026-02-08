import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useUserStore, useWorkoutStore } from '../../store';
import { APP_NAME, APP_VERSION } from '../../constants/config';
import type { RootStackParamList } from '../../models/types';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { profile, resetOnboarding } = useUserStore();
  const { unenrollFromProgram, sessionLogs } = useWorkoutStore();
  
  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Profile',
      'This will reset your profile settings. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            unenrollFromProgram();
            resetOnboarding();
          },
        },
      ]
    );
  };
  
  const MenuItem = ({ icon, title, value, onPress }: {
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={styles.menuIcon}>{icon}</Text>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {value && <Text style={styles.menuValue}>{value}</Text>}
      </View>
      {onPress && <Text style={styles.menuArrow}>›</Text>}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.name ? profile.name[0].toUpperCase() : '👤'}
            </Text>
          </View>
          <Text style={styles.name}>{profile?.name || 'Athlete'}</Text>
          <Text style={styles.email}>{profile?.email || 'Setup your profile'}</Text>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sessionLogs.length}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.daysPerWeek || 3}</Text>
            <Text style={styles.statLabel}>Days/Week</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.experience || 'N/A'}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Athletic Profile</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="🎯"
              title="Training Goals"
              value={profile?.goals?.join(', ') || 'Not set'}
            />
            <MenuItem
              icon="⚽"
              title="Sport"
              value={profile?.sport || 'Not specified'}
            />
            <MenuItem
              icon="💪"
              title="Experience Level"
              value={profile?.experience || 'Beginner'}
            />
            <MenuItem
              icon="📦"
              title="Equipment"
              value={profile?.equipment || 'Bodyweight'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="🔔"
              title="Notifications"
              value="Coming soon"
            />
            <MenuItem
              icon="🌙"
              title="Theme"
              value="Dark"
            />
            <MenuItem
              icon="📊"
              title="Export Data"
              value="Coming soon"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="❓"
              title="Help & FAQ"
            />
            <MenuItem
              icon="📝"
              title="Terms of Service"
            />
            <MenuItem
              icon="🔒"
              title="Privacy Policy"
            />
            <MenuItem
              icon="⭐"
              title="Rate the App"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Button
            title="RESET PROFILE"
            onPress={handleResetOnboarding}
            variant="outline"
          />
        </View>
        
        <View style={styles.appInfo}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.appVersion}>Version {APP_VERSION}</Text>
          <Text style={styles.copyright}>© 2024 Apex Athletic</Text>
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
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.text,
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
  },
  name: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  email: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
  },
  statsSection: {
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
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'capitalize',
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
  menuCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: colors.text,
    fontSize: typography.fontSize.md,
  },
  menuValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  menuArrow: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xl,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  appName: {
    color: colors.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  appVersion: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  copyright: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.sm,
  },
});
