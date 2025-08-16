import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../assets/theme'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Journal', path: '/journal' },
  { label: 'Resources', path: '/resources' },
  { label: 'Profile', path: '/profile' },
  { label: 'Toolkit', path: '/toolkit' },
]

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-[#F6F8F9] flex">
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 220,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 220,
              boxSizing: 'border-box',
              bgcolor: 'primary.main',
              color: '#F6F8F9',
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: '#F6F8F9' }}>MoodMate</Typography>
          </Toolbar>
          <List>
            {navLinks.map(link => {
              const selected = location.pathname === link.path
              return (
                <ListItem
                  button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    bgcolor: selected ? 'secondary.main' : undefined,
                    color: selected ? 'text.primary' : '#F6F8F9',
                    '&:hover': {
                      bgcolor: 'error.main',
                      color: 'text.primary',
                    },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItem>
              )
            })}
          </List>
        </Drawer>
        <main className="pt-8 flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
