# Next.js styled-components

Nextjs에서 styled component 셋업

## 특징

- 전반적으로 emotion 대비 쉽고, 라이브러리에서 잘 제공하고 있음

## Getting Started

1. `next.config.js`의 compiler에 옵션 추가

  ```js
  compiler: {
    styledComponents: true,
  }
  ```

1. `libs/styled-components` 디렉토리 안에 registry.tsx 파일 생성

     - Next.js에서 styled-components의 SSR을 가능하게 하는 브릿지 역할을 함

    ```tsx
    'use client';

    import { useState } from 'react';
    import { useServerInsertedHTML } from 'next/navigation';
    import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

    interface RegistryProps {
      children: React.ReactNode;
    }

    export function Registry({ children }: RegistryProps) {
      /**
       * `styledComponentsStyleSheet`로 서버 내의 스타일 코드를 추출히고 관리
       */
      const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

      /**
       * 서버 내의 스타일 코드를 추출하고 추출된 코드를 <head> 태그에 주입
       */
      useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
      });

      if (typeof window !== 'undefined') return <>{children}</>;

      /**
       * 서버 환경에서 추출된 스타일 코드를 children 안에 주입
       */
      return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
    }
    ```

2. `libs/styled-components` 디렉토리 안에 client-layout.tsx 파일 생성

    - SSR과는 관련없음
    - 이곳에서 Global styles를 관리하고 theme 관리

    ```tsx
    import { ThemeProvider } from 'styled-components';
    import { GlobalStyles } from './global-styles';
    import type { DefaultTheme } from 'styled-components';

    interface ClientLayoutProps {
      children: React.ReactNode;
    }

    const theme: DefaultTheme = {};

    export function ClientLayout({ children }: ClientLayoutProps) {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      );
    }
    ```

3. `layouts` 디렉토리 안에 SSR 코드 주입

    ```tsx
    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="ko">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <StyledComponentsRegistry>
              <StyledComponentsClientLayout>{children}</StyledComponentsClientLayout>
            </StyledComponentsRegistry>
          </body>
        </html>
      );
    }
    ```