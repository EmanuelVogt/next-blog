import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Box, ThemeProvider } from '@mui/material'

import { DarkTheme } from '../themes/dark'
import { LightTheme } from '../themes/light'

type ThemeContextData = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ThemeContext = createContext({} as ThemeContextData)

type Props = {
  children: React.ReactNode
}

export function AppThemeProvider({ children }: Props): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(()=>{
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  const getTheme = useMemo(() => {
    if(theme === 'light') return LightTheme 
    return DarkTheme
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={getTheme}>
        <Box bgcolor={getTheme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useAppThemeContext = (): ThemeContextData  => {
  return useContext(ThemeContext)
}