// Apex Athletic Training App - Theme Constants
// Dark-first design system for athletic performance app

export const colors = {
  // Primary brand colors
  primary: '#FF6B35',
  primaryLight: '#FF8555',
  primaryDark: '#E55A2B',
  
  // Background colors (dark theme)
  background: '#0A0A0F',
  backgroundSecondary: '#14141F',
  backgroundCard: '#1A1A2E',
  backgroundElevated: '#252540',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDisabled: '#4B5563',
  
  // Status colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Accent colors
  accent: '#8B5CF6',
  accentBlue: '#3B82F6',
  accentGreen: '#10B981',
  accentYellow: '#FBBF24',
  
  // Border colors
  border: '#374151',
  borderLight: '#4B5563',
  
  // Perceived difficulty colors
  difficultyEasy: '#22C55E',
  difficultyGood: '#FBBF24',
  difficultyHard: '#EF4444',
  
  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  
  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations,
};
