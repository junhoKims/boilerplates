# zustand Boilerplate

state-management 라이브러리 zustand boilerplate 세팅

## Core

- 작은 용량 (2023/11/06 기준 jotai 보다 작음)
- 낮은 러닝커브
- selector의 범위 설정의 실수로 인한 참조 문제를 막고자 atomic 단위로 호출 ([링크](https://docs.pmnd.rs/zustand/guides/auto-generating-selectors))
- 필요한 부분은 store를 만들어서 수정. 하나의 store에서 다른 store를 수정할 일이 없도록 구현

## Utils

store hook 생성을 위한 create 함수 및 이를 체이닝으로 호출하기 위해 구현한 함수 존재

### create

store 생성하는 함수, 개발 환경에 따라 devtools middleware를 적용

```
export const useStore = create<Store>(set => ({ bears: 0 }));
```

### createWithMiddleware

middleware를 포함하는 store 생성하는 함수, 개발 환경에 따라 devtools middleware를 적용

```
const useStore = createWithMiddleware<Store>()(
  persist(
    (set) => ({ bears: 0, }),
    { name: 'bound-store' },
  ),
);
```

### createSelectors

store의 state를 체이닝하여 접근할 수 있도록 만들어주는 함수 ([링크](https://docs.pmnd.rs/zustand/guides/auto-generating-selectors))

```
export const useStore = createSelectors(
  create<Store>(set => ({ bears: 0 }))
);

// 아래처럼 사용
const bears = useBearStore.use.bears();
```