import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimeRange = '15m' | '1h' | '6h' | '24h' | '7d' | '30d';

interface GlobalState {
  selectedTimeRange: TimeRange;
  selectedEnvironment: string;
  setTimeRange: (range: TimeRange) => void;
  setEnvironment: (env: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      selectedTimeRange: '1h',
      selectedEnvironment: 'production',
      setTimeRange: (range) => set({ selectedTimeRange: range }),
      setEnvironment: (env) => set({ selectedEnvironment: env }),
    }),
    { name: 'observability-global' }
  )
);
