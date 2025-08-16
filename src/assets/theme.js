import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A9CA4', // Accent blue
    },
    secondary: {
      main: '#C4E2E6', // Light blue for active links
    },
    error: {
      main: '#22223B', // Dark blue for consistency
    },
    background: {
      default: '#F6F8F9', // Light background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#22223B', // Dark text
      secondary: '#5F6D7B', // Dark gray for secondary text
    },
  },
})

export default theme