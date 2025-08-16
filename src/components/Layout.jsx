import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab, RadioGroup, FormControlLabel, Radio } from '@mui/material'
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
  // Quick Mood Entry state
  const [moodDialogOpen, setMoodDialogOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState('happy')
  const handleMoodSave = () => {
    setMoodDialogOpen(false)
    alert(`Mood logged: ${selectedMood}`)
  }
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
            bgcolor: 'white', // Set sidebar to white
            color: '#22223B', // Set default text color
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" className="font-bold text-[#22223B]">MoodMate</Typography>
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
                  bgcolor: selected ? '#C4E2E6' : 'transparent',
                  color: '#22223B',
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: '#A3D4DB', // A slightly darker blue for hover
                    color: '#22223B',
                  },
                }}
              >
                <ListItemText primary={link.label} />
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
              mx: 1,
              '&:hover': {
                bgcolor: '#5A9CA4', // Accent blue on hover
                color: 'white',
              },
            }}
            onClick={() => setOpen(true)}
          >
            <ListItemText primary="Crisis Support" />
          </ListItem>
        </List>
      </Drawer>

        <main className="pt-8 flex-1">
          {children}
          {/* Quick Mood Entry Floating Button */}
          <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }} onClick={() => setMoodDialogOpen(true)}>
            <AddReactionIcon />
          </Fab>
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
              <Button onClick={handleMoodSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </main>
        {/* Crisis Support Modal */}
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
            <Button onClick={() => setOpen(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}