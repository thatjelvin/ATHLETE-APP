import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import type { OnboardingStackParamList } from '../../models/types';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🏃‍♂️</Text>
          <Text style={styles.appName}>APEX</Text>
          <Text style={styles.tagline}>Athletic Training</Text>
        </View>
        
        <View style={styles.heroText}>
          <Text style={styles.title}>Train Like an Athlete</Text>
          <Text style={styles.subtitle}>
            Your pocket coach for speed, power, and explosive performance
          </Text>
        </View>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Speed Training</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🚀</Text>
            <Text style={styles.featureText}>Vertical Jump</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💥</Text>
            <Text style={styles.featureText}>Explosiveness</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="GET STARTED"
          onPress={() => navigation.navigate('Goals')}
          size="large"
        />
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink}>Log In</Text>
        </Text>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  appName: {
    color: colors.primary,
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 8,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  heroText: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
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
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    paddingHorizontal: spacing.lg,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xl,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});
