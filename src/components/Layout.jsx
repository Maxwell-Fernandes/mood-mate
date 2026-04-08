import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../assets/theme'
import AddReactionIcon from '@mui/icons-material/AddReaction'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Journal', path: '/journal' },
  { label: 'Resources', path: '/resources' },
  { label: 'Profile', path: '/profile' },
  { label: 'Toolkit', path: '/toolkit' },
]

const crisisContacts = [
  { name: 'National Suicide Prevention Lifeline', number: '1-800-273-8255' },
  { name: 'Crisis Text Line', number: 'Text HOME to 741741' },
  { name: 'SAMHSA Treatment Referral', number: '1-800-662-HELP (4357)' },
  { name: 'Emergency Services', number: '911' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [moodDialogOpen, setMoodDialogOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState('happy')

  const handleMoodSave = () => {
    setMoodDialogOpen(false)
    alert(`Mood logged: ${selectedMood}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#F6F8F9', overflowX: 'hidden' }}>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 220,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 220,
              boxSizing: 'border-box',
              bgcolor: 'white',
              color: '#22223B',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#22223B' }}>
              MoodMate
            </Typography>
          </Toolbar>

          <List sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', px: 1 }}>
            {navLinks.map(link => {
              const selected = location.pathname === link.path
              return (
                <ListItem
                  key={link.path}
                  component={Link}
                  to={link.path}
                  disablePadding
                  sx={{
                    borderRadius: 1,
                    my: 0.5,
                    px: 1.5,
                    py: 1,
                    bgcolor: selected ? '#C4E2E6' : 'transparent',
                    color: '#22223B',
                    textDecoration: 'none',
                    '&:hover': {
                      bgcolor: '#A3D4DB',
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ noWrap: true, fontSize: 14 }}
                  />
                </ListItem>
              )
            })}

            {/* Crisis Support Button */}
            <ListItem
              button
              sx={{
                mt: 2,
                bgcolor: '#22223B',
                color: 'white',
                borderRadius: 2,
                
                '&:hover': {
                  bgcolor: '#5A9CA4',
                },
              }}
              onClick={() => setOpen(true)}
            >
              <ListItemText primary="Crisis Support" />
            </ListItem>
          </List>
        </Drawer>

        <main style={{ flex: 1, paddingTop: '2rem', overflowX: 'hidden' }}>
          {children}

          {/* Quick Mood Entry Floating Button */}
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000,
              backgroundColor: '#5A9CA4',
              '&:hover': { backgroundColor: '#4C8C94' },
            }}
            onClick={() => setMoodDialogOpen(true)}
          >
            <AddReactionIcon />
          </Fab>

          {/* Mood Dialog */}
          <Dialog open={moodDialogOpen} onClose={() => setMoodDialogOpen(false)}>
            <DialogTitle>Quick Mood Entry</DialogTitle>
            <DialogContent>
              <RadioGroup value={selectedMood} onChange={e => setSelectedMood(e.target.value)}>
                <FormControlLabel value="happy" control={<Radio />} label="Happy" />
                <FormControlLabel value="calm" control={<Radio />} label="Calm" />
                <FormControlLabel value="energetic" control={<Radio />} label="Energetic" />
                <FormControlLabel value="sad" control={<Radio />} label="Sad" />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMoodDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleMoodSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Crisis Support Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Crisis Support & Emergency Contacts</DialogTitle>
            <DialogContent>
              <List>
                {crisisContacts.map(c => (
                  <ListItem key={c.name}>
                    <ListItemText primary={c.name} secondary={c.number} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </ThemeProvider>
  )
}
