import { createBearSlice, BearStore } from './bear';
import { create } from '../libs/zustand';
import { persist } from 'zustand/middleware';

const useBoundStore = create<BearStore>(
  persist(
    (...a) => ({
      ...createBearSlice(...a),
    }),
    { name: 'bound-store' },
  ),
);
