import type { StateCreator } from 'zustand';

export type Slice<T, U = T> = StateCreator<U, [], [], T>;
