import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { ThemeConfig } from '../types';
import { NO_CAMPAIGN_THEME } from '../data/campaigns';

interface ThemeContextValue {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: NO_CAMPAIGN_THEME,
});

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ThemeConfig;
}) => {
  const value = useMemo(() => ({ theme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeConfig => {
  return useContext(ThemeContext).theme;
};
