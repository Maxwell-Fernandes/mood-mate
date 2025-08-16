import { AppBar, Toolbar, Typography, Button, Container, Paper } from '@mui/material'
import './App.css'

function App() {
  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#5A9CA4' }} className="w-full">
        <Toolbar className="w-full px-4 flex justify-between">
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#F6F8F9' }}>
            MoodMate Dashboard
          </Typography>
          <div className="space-x-2">
            <Button sx={{ color: '#F6F8F9', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>Home</Button>
            <Button sx={{ color: '#F6F8F9', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>Journal</Button>
            <Button sx={{ color: '#F6F8F9', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>Resources</Button>
            <Button sx={{ color: '#F6F8F9', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>Profile</Button>
          </div>
        </Toolbar>
      </AppBar>
      {/* Dashboard Section */}
      <Container className="mt-8 flex justify-center">
        <Paper elevation={3} className="p-8 w-full max-w-xl bg-[#F6F8F9]">
          <Typography variant="h5" gutterBottom className="text-[#5A9CA4]">
            Welcome to your Mindful Wellness Dashboard
          </Typography>
          <Typography variant="body1" className="mt-2 text-[#22223B]">
            Track your mood, write in your journal, and explore resources to support your mental health.
          </Typography>
          <div className="mt-6 flex justify-center">
            <Button variant="contained" sx={{ bgcolor: '#ECA7A7', color: '#22223B', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>
              Start Mindful Activity
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  )
}

export default App
