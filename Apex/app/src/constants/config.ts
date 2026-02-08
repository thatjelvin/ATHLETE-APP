// App-wide constants and configuration

export const APP_NAME = 'Apex Athletic';
export const APP_VERSION = '1.0.0';

// Goals for onboarding
export const TRAINING_GOALS = [
  { id: 'speed', label: 'Speed', icon: '⚡', description: 'Get faster' },
  { id: 'vertical_jump', label: 'Vertical Jump', icon: '🚀', description: 'Jump higher' },
  { id: 'explosiveness', label: 'Explosiveness', icon: '💥', description: 'More power' },
  { id: 'agility', label: 'Agility', icon: '🔄', description: 'Move quicker' },
  { id: 'athletic_base', label: 'Athletic Base', icon: '🏋️', description: 'All-around' },
] as const;

// Experience levels
export const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner', icon: '🌱', description: 'New to structured training' },
  { id: 'intermediate', label: 'Intermediate', icon: '💪', description: '1-2 years consistent work' },
  { id: 'advanced', label: 'Advanced', icon: '🔥', description: '3+ years, sport-specific' },
] as const;

// Equipment options
export const EQUIPMENT_OPTIONS = [
  { id: 'bodyweight', label: 'Bodyweight Only', icon: '🏠', description: 'No equipment needed' },
  { id: 'minimal', label: 'Minimal', icon: '📦', description: 'Bands, jump rope, light DBs' },
  { id: 'full_gym', label: 'Full Gym', icon: '🏋️', description: 'Barbells, racks, boxes' },
] as const;

// Available sports for selection
export const SPORTS = [
  'Basketball',
  'Football',
  'Soccer',
  'Track & Field',
  'Volleyball',
  'Tennis',
  'Baseball',
  'Softball',
  'Swimming',
  'Martial Arts',
  'CrossFit',
  'General Fitness',
  'Other',
] as const;

// Injury flags
export const INJURY_FLAGS = [
  { id: 'ankle', label: 'Ankle' },
  { id: 'knee', label: 'Knee' },
  { id: 'meniscus', label: 'Meniscus' },
  { id: 'hip', label: 'Hip' },
  { id: 'lower_back', label: 'Lower Back' },
  { id: 'shoulder', label: 'Shoulder' },
] as const;

// Perceived difficulty options
export const PERCEIVED_DIFFICULTY = [
  { id: 'easy', label: 'Easy', color: '#22C55E', description: 'Could do more' },
  { id: 'good', label: 'Good', color: '#FBBF24', description: 'Just right' },
  { id: 'hard', label: 'Hard', color: '#EF4444', description: 'Pushed limits' },
] as const;

// Session types
export const SESSION_TYPES = [
  'technique',
  'power',
  'speed',
  'strength',
  'endurance',
  'recovery',
] as const;

// Intent types for exercises
export const EXERCISE_INTENTS = [
  'Speed',
  'Reactive',
  'Control',
  'Power',
  'Mobility',
] as const;

// Days of the week
export const DAYS_OF_WEEK = [
  { id: 0, short: 'Sun', full: 'Sunday' },
  { id: 1, short: 'Mon', full: 'Monday' },
  { id: 2, short: 'Tue', full: 'Tuesday' },
  { id: 3, short: 'Wed', full: 'Wednesday' },
  { id: 4, short: 'Thu', full: 'Thursday' },
  { id: 5, short: 'Fri', full: 'Friday' },
  { id: 6, short: 'Sat', full: 'Saturday' },
] as const;

// Storage keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  ACTIVE_PROGRAM: 'active_program',
  SESSION_HISTORY: 'session_history',
  APP_THEME: 'app_theme',
} as const;
