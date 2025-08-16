import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A9CA4', // blue-green
    },
    secondary: {
      main: '#F7C873', // yellow
    },
    error: {
      main: '#ECA7A7', // pink
    },
    background: {
      default: '#F6F8F9', // light background
      paper: '#F6F8F9',
    },
    text: {
      primary: '#22223B', // dark text
      secondary: '#5A9CA4',
    },
  },
})

export default theme