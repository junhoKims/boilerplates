import { getIsClient } from './get-is-client.js';

describe('getIsClient', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it('window가 undefined인 서버 환경에서 false를 반환', () => {
    (globalThis.window as any) = undefined;
    expect(getIsClient()).toBe(false);
  });

  it('window가 존재하는 클라이언트 환경에서 true를 반환', () => {
    expect(getIsClient()).toBe(true);
  });
});
