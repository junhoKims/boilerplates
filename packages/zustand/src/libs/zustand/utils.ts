import { create as createLib } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
  UseBoundStore,
} from 'zustand';

/**
 * store 생성하는 함수
 * 개발 환경에 따라 devtools middleware를 적용
 *
 * @example
 * export const useStore = createActions<Store>(set => ({
 *   bears: 0,
 * }));
 */
export const create = <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
  store: StateCreator<T, [], Mos>,
) => {
  const isDev = import.meta.env.MODE === 'development';

  return isDev
    ? createLib(devtools(store) as StateCreator<T, [], Mos>)
    : createLib(store);
};

/**
 * middleware를 포함하는 store 생성하는 함수
 * 개발 환경에 따라 devtools middleware를 적용
 *
 * @example
 * const useStore = createWithMiddleware<Store>()(
 *   persist(
 *     (set) => ({
 *       bears: 0,
 *     }),
 *     { name: 'bound-store' },
 *   ),
 * );
 */
export const createWithMiddleware = <T>() => {
  return <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    store: StateCreator<T, [], Mos>,
  ) => {
    const isDev = import.meta.env.MODE === 'development';

    return isDev
      ? createLib<T>()(devtools(store) as StateCreator<T, [], Mos>)
      : createLib<T>()(store);
  };
};

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

/**
 * store의 state를 체이닝하여 접근할 수 있도록 만들어주는 함수
 *
 * @see
 * https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
 *
 * @example
 * export const useStore = createSelectors(
 *   create<Store>(set => ({
 *     bears: 0,
 *   }))
 * );
 *
 * const bears = useBearStore.use.bears()
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, unknown>)[k] = () =>
      store((s) => s[k as keyof typeof s]);
  }

  return store;
};
