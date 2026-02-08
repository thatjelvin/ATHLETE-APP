import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../constants/theme';

interface ProgressDotsProps {
  total: number;
  current: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index <= current ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.border,
  },
});
