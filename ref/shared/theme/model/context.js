import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  forceDark: false,
  isDark: false,
});
