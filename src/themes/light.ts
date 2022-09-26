import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#023E7D',
      dark: '#001845',
      light: '#0466C8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#BB4D00',
      dark: '#691E06',
      light: '#FBBA72',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    }
  }
})