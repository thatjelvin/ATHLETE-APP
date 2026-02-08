import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../constants/theme';
import type { PerceivedDifficulty } from '../models/types';
import { PERCEIVED_DIFFICULTY } from '../constants/config';

interface PerceivedDifficultyPickerProps {
  value?: PerceivedDifficulty;
  onChange: (difficulty: PerceivedDifficulty) => void;
}

export const PerceivedDifficultyPicker: React.FC<PerceivedDifficultyPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How did that feel?</Text>
      <View style={styles.options}>
        {PERCEIVED_DIFFICULTY.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              value === option.id && { borderColor: option.color },
            ]}
            onPress={() => onChange(option.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.emoji, { backgroundColor: option.color }]}>
              <Text style={styles.emojiText}>
                {option.id === 'easy' ? '😊' : option.id === 'good' ? '💪' : '😤'}
              </Text>
            </View>
            <Text style={[styles.label, value === option.id && { color: option.color }]}>
              {option.label}
            </Text>
            <Text style={styles.description}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
    backgroundColor: colors.backgroundCard,
    minWidth: 100,
  },
  emoji: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emojiText: {
    fontSize: 24,
  },
  label: {
    color: colors.text,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
  },
});
