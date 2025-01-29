'use client';

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
