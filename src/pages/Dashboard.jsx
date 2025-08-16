import { Typography, Button, Paper } from '@mui/material'
import { useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// Mock data for demonstration
const streak = 5 // days
const achievements = [
  { label: 'First Week Streak', unlocked: true },
  { label: '10 Happy Entries', unlocked: false },
  { label: 'Night Owl Journaler', unlocked: false },
]

// Generate mock year in pixels data
const moods = ['#F7C873', '#ECA7A7', '#5A9CA4', '#22223B'] // happy, calm, energetic, sad
const today = new Date('2025-08-16')
const yearPixels = Array.from({ length: 12 }, (_, month) =>
  Array.from({ length: 31 }, (_, day) => {
    // Random mood color for demo
    return moods[Math.floor(Math.random() * moods.length)]
  })
)

export default function Dashboard() {
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-[#F6F8F9]">
      {/* Journaling Streak Counter */}
      <div className="mb-4 flex items-center gap-2">
        <CalendarTodayIcon sx={{ color: '#5A9CA4' }} />
        <Typography variant="h6" className="text-[#5A9CA4]">Journaling Streak: {streak} days</Typography>
      </div>
      {/* Achievements/Badges */}
      <div className="mb-6">
        <Typography variant="subtitle1" className="text-[#5A9CA4] mb-2">Achievements</Typography>
        <div className="flex gap-3 flex-wrap">
          {achievements.map(a => (
            <div key={a.label} className={`flex items-center gap-1 px-3 py-1 rounded ${a.unlocked ? 'bg-[#F7C873]' : 'bg-gray-300'}`}>
              <EmojiEventsIcon sx={{ color: a.unlocked ? '#ECA7A7' : '#888' }} />
              <Typography variant="body2">{a.label}</Typography>
            </div>
          ))}
        </div>
      </div>
      {/* Year in Pixels View */}
      <div className="mb-6">
        <Typography variant="subtitle1" className="text-[#5A9CA4] mb-2">Year in Pixels</Typography>
        <div className="grid grid-cols-12 gap-1">
          {yearPixels.map((month, mIdx) => (
            <div key={mIdx} className="flex flex-col gap-1">
              {month.map((color, dIdx) => (
                <div key={dIdx} style={{ background: color, width: 12, height: 12, borderRadius: 2, border: '1px solid #eee' }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Typography variant="h4" className="text-[#5A9CA4] mb-4">Welcome to MoodMate</Typography>
      <Typography variant="body1" className="text-[#22223B] mb-6">
        Track your mood, write in your journal, and explore resources to support your mental health.
      </Typography>
      <Button variant="contained" sx={{ bgcolor: '#ECA7A7', color: '#22223B', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>
        Start Mindful Activity
      </Button>
    </Paper>
  )
}
