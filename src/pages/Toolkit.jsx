import { Typography, Paper, Button } from '@mui/material'
import { useState } from 'react'

// Guided Breathing Exercise (Box Breathing)
function BreathingExercise() {
  const [step, setStep] = useState(0)
  const steps = ['Inhale', 'Hold', 'Exhale', 'Hold']
  const durations = [4, 4, 4, 4] // seconds

  // Simple timer logic
  const nextStep = () => setStep((s) => (s + 1) % steps.length)

  return (
    <Paper elevation={2} className="p-4 mb-6 bg-[#ECA7A7] flex flex-col items-center">
      <Typography variant="h6" className="mb-2">Box Breathing</Typography>
      <Typography variant="body1" className="mb-2">{steps[step]}</Typography>
      <div className="w-24 h-24 border-4 border-[#5A9CA4] animate-pulse flex items-center justify-center rounded-lg mb-2">
        <Typography variant="h4">{durations[step]}</Typography>
      </div>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Paper>
  )
}

// Mindfulness Library
const scripts = [
  {
    title: 'Body Scan',
    text: 'Bring attention to each part of your body, starting at your toes and moving up to your head. Notice sensations without judgment.'
  },
  {
    title: 'Loving-Kindness',
    text: 'Silently repeat: May I be happy. May I be healthy. May I be safe. May I live with ease.'
  },
  {
    title: 'Breath Awareness',
    text: 'Focus on the natural rhythm of your breath. If your mind wanders, gently bring it back to your breath.'
  }
]

// Customizable Reminders
function ReminderSetup() {
  const [time, setTime] = useState('')
  const [permission, setPermission] = useState(Notification.permission)

  const requestPermission = () => {
    Notification.requestPermission().then(setPermission)
  }

  const setReminder = () => {
    if (permission === 'granted' && time) {
      // Demo: schedule notification after 5 seconds
      setTimeout(() => {
        new Notification('MoodMate Reminder', { body: 'Time to write in your journal!' })
      }, 5000)
      alert('Reminder set! (Demo: will notify in 5 seconds)')
    }
  }

  return (
    <Paper elevation={2} className="p-4 mb-6 bg-[#F7C873] flex flex-col items-center">
      <Typography variant="h6" className="mb-2">Daily Journal Reminder</Typography>
      {permission !== 'granted' ? (
        <Button variant="contained" onClick={requestPermission}>Enable Notifications</Button>
      ) : (
        <>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="mb-2 p-2 rounded" />
          <Button variant="contained" onClick={setReminder}>Set Reminder</Button>
        </>
      )}
    </Paper>
  )
}

export default function Toolkit() {
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-[#F6F8F9]">
      <Typography variant="h4" className="text-[#5A9CA4] mb-4">Instant Wellness Toolkit</Typography>
      <BreathingExercise />
      <ReminderSetup />
      <div className="mb-6">
        <Typography variant="h6" className="mb-2 text-[#5A9CA4]">Mindfulness Library</Typography>
        {scripts.map(s => (
          <Paper key={s.title} elevation={1} className="p-3 mb-2 bg-[#ECA7A7]">
            <Typography variant="subtitle1">{s.title}</Typography>
            <Typography variant="body2">{s.text}</Typography>
          </Paper>
        ))}
      </div>
    </Paper>
  )
}