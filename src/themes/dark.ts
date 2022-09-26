import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
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
      default: '#202124',
      paper: '#303134',
    }
  }
})