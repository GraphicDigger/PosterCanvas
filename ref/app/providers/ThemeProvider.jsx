import React, { useMemo } from 'react';
import { ThemeContext } from '../../shared/theme/model/context';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '../../shared/theme/styles/themes';

export const ThemeProvider = ({ children, forceDark = false }) => {

  const theme = useMemo(() => {
    const selectedTheme = forceDark ? darkTheme : lightTheme;
    return selectedTheme;
  }, [forceDark]);

  return (
    <EmotionProvider theme={theme}>
      {children}
    </EmotionProvider>
  );
};
