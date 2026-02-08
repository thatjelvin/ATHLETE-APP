import { create } from 'zustand';
import type {
  UserProfile,
  TrainingGoal,
  ExperienceLevel,
  EquipmentAccess,
  InjuryFlag,
} from '../models/types';

interface UserState {
  profile: UserProfile | null;
  isOnboardingComplete: boolean;
  isLoading: boolean;
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  clearProfile: () => void;
}

const generateUserId = (): string => {
  return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isOnboardingComplete: false,
  isLoading: false,
  
  setProfile: (profile) => set({ profile }),
  
  updateProfile: (updates) => {
    const currentProfile = get().profile;
    if (currentProfile) {
      set({
        profile: {
          ...currentProfile,
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      // Create new profile with defaults
      const now = new Date().toISOString();
      set({
        profile: {
          id: generateUserId(),
          name: '',
          locale: 'en-US',
          goals: [],
          experience: 'beginner' as ExperienceLevel,
          equipment: 'bodyweight' as EquipmentAccess,
          daysPerWeek: 3,
          injuryFlags: [],
          videoUploadConsent: false,
          createdAt: now,
          updatedAt: now,
          ...updates,
        } as UserProfile,
      });
    }
  },
  
  completeOnboarding: () => set({ isOnboardingComplete: true }),
  
  resetOnboarding: () => set({ isOnboardingComplete: false }),
  
  clearProfile: () => set({ profile: null, isOnboardingComplete: false }),
}));

// Onboarding state - temporary state during onboarding flow
interface OnboardingState {
  currentStep: number;
  goals: TrainingGoal[];
  sport: string | null;
  experience: ExperienceLevel | null;
  equipment: EquipmentAccess | null;
  daysPerWeek: number;
  injuryFlags: InjuryFlag[];
  
  // Actions
  setGoals: (goals: TrainingGoal[]) => void;
  toggleGoal: (goal: TrainingGoal) => void;
  setSport: (sport: string | null) => void;
  setExperience: (experience: ExperienceLevel) => void;
  setEquipment: (equipment: EquipmentAccess) => void;
  setDaysPerWeek: (days: number) => void;
  toggleInjuryFlag: (flag: InjuryFlag) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 0,
  goals: [],
  sport: null,
  experience: null,
  equipment: null,
  daysPerWeek: 3,
  injuryFlags: [],
  
  setGoals: (goals) => set({ goals }),
  
  toggleGoal: (goal) => {
    const currentGoals = get().goals;
    if (currentGoals.includes(goal)) {
      set({ goals: currentGoals.filter((g) => g !== goal) });
    } else {
      set({ goals: [...currentGoals, goal] });
    }
  },
  
  setSport: (sport) => set({ sport }),
  setExperience: (experience) => set({ experience }),
  setEquipment: (equipment) => set({ equipment }),
  setDaysPerWeek: (daysPerWeek) => set({ daysPerWeek }),
  
  toggleInjuryFlag: (flag) => {
    const currentFlags = get().injuryFlags;
    if (currentFlags.includes(flag)) {
      set({ injuryFlags: currentFlags.filter((f) => f !== flag) });
    } else {
      set({ injuryFlags: [...currentFlags, flag] });
    }
  },
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  resetOnboarding: () =>
    set({
      currentStep: 0,
      goals: [],
      sport: null,
      experience: null,
      equipment: null,
      daysPerWeek: 3,
      injuryFlags: [],
    }),
}));
