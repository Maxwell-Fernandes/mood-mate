import { Typography, Paper, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

const themes = {
  light: {
    background: '#F6F8F9',
    color: '#22223B',
  },
  dark: {
    background: '#22223B',
    color: '#F6F8F9',
  },
  colorful: {
    background: '#F7C873',
    color: '#5A9CA4',
  },
}

export default function Profile() {
  const [theme, setTheme] = useState('light')
  const handleThemeChange = (_, newTheme) => {
    if (newTheme) setTheme(newTheme)
  }
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto" style={{ background: themes[theme].background, color: themes[theme].color }}>
      <Typography variant="h4" className="mb-4" style={{ color: themes[theme].color }}>Profile</Typography>
      <Typography variant="body1" style={{ color: themes[theme].color }}>
        View and edit your personal information and preferences.
      </Typography>
      <div className="mt-6">
        <Typography variant="subtitle1" className="mb-2" style={{ color: themes[theme].color }}>Theme Customization</Typography>
        <ToggleButtonGroup value={theme} exclusive onChange={handleThemeChange}>
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
          <ToggleButton value="colorful">Colorful</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Paper>
  )
}
