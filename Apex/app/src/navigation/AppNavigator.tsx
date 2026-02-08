import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import {
  WelcomeScreen,
  GoalsScreen,
  SportScreen,
  ExperienceScreen,
  EquipmentScreen,
  DaysPerWeekScreen,
  InjuriesScreen,
  CompleteScreen,
} from '../screens/onboarding';
import { TrainScreen, WorkoutSessionScreen } from '../screens/train';
import { ProgramsScreen, ProgramDetailScreen } from '../screens/programs';
import { ProgressScreen } from '../screens/progress';
import { ProfileScreen } from '../screens/profile';

import { useUserStore, useWorkoutStore } from '../store';
import { colors, spacing, typography } from '../constants/theme';
import type { RootStackParamList, MainTabParamList, OnboardingStackParamList } from '../models/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

// Custom theme for Navigation
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.backgroundCard,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

// Tab bar icon component
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Train: '🏃',
    Programs: '📋',
    Progress: '📊',
    Profile: '👤',
  };
  
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icons[name]}
      </Text>
    </View>
  );
};

// Onboarding Navigator
const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
      <OnboardingStack.Screen name="Goals" component={GoalsScreen} />
      <OnboardingStack.Screen name="Sport" component={SportScreen} />
      <OnboardingStack.Screen name="Experience" component={ExperienceScreen} />
      <OnboardingStack.Screen name="Equipment" component={EquipmentScreen} />
      <OnboardingStack.Screen name="DaysPerWeek" component={DaysPerWeekScreen} />
      <OnboardingStack.Screen name="Injuries" component={InjuriesScreen} />
      <OnboardingStack.Screen name="Complete" component={CompleteScreen} />
    </OnboardingStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Train" component={TrainScreen} />
      <Tab.Screen name="Programs" component={ProgramsScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const { isOnboardingComplete } = useUserStore();
  const { loadSeedData, generateWeeklyPlan } = useWorkoutStore();
  
  // Load seed data when app starts
  React.useEffect(() => {
    loadSeedData();
    if (isOnboardingComplete) {
      generateWeeklyPlan();
    }
  }, [isOnboardingComplete]);
  
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!isOnboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen
              name="WorkoutSession"
              component={WorkoutSessionScreen}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'fullScreenModal',
              }}
            />
            <Stack.Screen
              name="ProgramDetail"
              component={ProgramDetailScreen}
              options={{
                animation: 'slide_from_right',
                headerShown: true,
                headerTitle: 'Program Details',
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundCard,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 85,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    marginTop: spacing.xs,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabIconFocused: {
    opacity: 1,
  },
});
