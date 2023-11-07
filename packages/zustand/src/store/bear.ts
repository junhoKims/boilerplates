import { create, createSelectors } from '@/libs/zustand';

export type BearState = {
  bears: number;
};

export type BearAction = {
  actions: {
    increase: () => void;
    reset: () => void;
  };
};

export type BearStore = BearState & BearAction;

const DEFAULT_STATES: BearState = {
  bears: 0,
};

export const useBearStore = createSelectors(
  create<BearStore>((set) => ({
    bears: 0,
    actions: {
      increase: () => set((state) => ({ bears: state.bears + 1 })),
      reset: () => set(DEFAULT_STATES),
    },
  })),
);
