import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SelectionCard, ProgressDots } from '../../components';
import { colors, typography, spacing } from '../../constants/theme';
import { EQUIPMENT_OPTIONS } from '../../constants/config';
import { useOnboardingStore } from '../../store';
import type { OnboardingStackParamList, EquipmentAccess } from '../../models/types';

type EquipmentScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Equipment'>;
};

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ navigation }) => {
  const { equipment, setEquipment } = useOnboardingStore();
  
  const handleSelect = (option: EquipmentAccess) => {
    setEquipment(option);
  };
  
  const handleContinue = () => {
    if (equipment) {
      navigation.navigate('DaysPerWeek');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ProgressDots total={7} current={3} />
      
      <View style={styles.content}>
        <Text style={styles.title}>What equipment do you have?</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {EQUIPMENT_OPTIONS.map((option) => (
            <SelectionCard
              key={option.id}
              title={option.label}
              description={option.description}
              icon={option.icon}
              selected={equipment === option.id}
              onPress={() => handleSelect(option.id as EquipmentAccess)}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="CONTINUE"
          onPress={handleContinue}
          disabled={!equipment}
          size="large"
        />
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
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
