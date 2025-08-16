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

// Mock correlation insight
const moodActivityInsight = "You've tagged 'exercise' on 8 of your 10 happiest days. Keep it up!";

// Generate mock year in pixels data
const moods = ['#F7C873', '#ECA7A7', '#5A9CA4', '#22223B'] // happy, calm, energetic, sad
const today = new Date('2025-08-16')
const yearPixels = Array.from({ length: 12 }, (_, month) =>
  Array.from({ length: 31 }, (_, day) => {
    // Random mood color for demo
    return moods[Math.floor(Math.random() * moods.length)]
  })
)

// Mock recent moods and activities
const recentEntries = [
  { mood: 'happy', activity: 'exercise' },
  { mood: 'happy', activity: 'exercise' },
  { mood: 'calm', activity: 'family' },
  { mood: 'happy', activity: 'exercise' },
  { mood: 'sad', activity: 'work' },
]

// Simple prediction logic
const moodCounts = recentEntries.reduce((acc, e) => {
  acc[e.mood] = (acc[e.mood] || 0) + 1
  return acc
}, {})
const predictedMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b)
const suggestedActivity = recentEntries.filter(e => e.mood === predictedMood)[0]?.activity || 'exercise'
const moodPredictionText = `Based on your recent entries, you might feel ${predictedMood} tomorrow. Try doing more '${suggestedActivity}' for a better day!`

// Mock gratitude entry dates (YYYY-MM-DD)
const gratitudeDates = [
  '2025-08-12',
  '2025-08-13',
  '2025-08-14',
  '2025-08-15',
  '2025-08-16',
]

// Calculate streak
function getGratitudeStreak(dates) {
  const today = new Date('2025-08-16')
  let streak = 0
  for (let i = 0; i < dates.length; i++) {
    const date = new Date(dates[dates.length - 1 - i])
    const expected = new Date(today)
    expected.setDate(today.getDate() - i)
    if (date.toDateString() === expected.toDateString()) {
      streak++
    } else {
      break
    }
  }
  return streak
}
const gratitudeStreak = getGratitudeStreak(gratitudeDates)

// Affirmations
const affirmations = [
  "You are enough.",
  "Every day is a fresh start.",
  "You have the power to change your story.",
  "You are stronger than you think.",
  "Your feelings are valid."
]
const todayAffirmation = affirmations[Math.floor(today.getDate() % affirmations.length)]

export default function Dashboard() {
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-[#F6F8F9]">
      {/* Journaling Streak Counter */}
      <div className="mb-4 flex items-center gap-2">
        <CalendarTodayIcon sx={{ color: '#5A9CA4' }} />
        <Typography variant="h6" className="text-[#5A9CA4]">Journaling Streak: {streak} days</Typography>
      </div>
      {/* Gratitude Streak Counter */}
      <div className="mb-4 flex items-center gap-2">
        <Typography variant="subtitle1" className="text-[#5A9CA4]">Gratitude Streak: {gratitudeStreak} days</Typography>
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
      {/* Mood-Activity Correlation Insight */}
      <div className="mb-6 p-4 rounded bg-[#ECA7A7]">
        <Typography variant="subtitle1" className="text-[#5A9CA4] mb-1">Personalized Insight</Typography>
        <Typography variant="body2">{moodActivityInsight}</Typography>
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
      {/* Mood Prediction & Suggestion */}
      <div className="mb-6 p-4 rounded bg-[#F7C873]">
        <Typography variant="subtitle1" className="text-[#5A9CA4] mb-1">Mood Prediction & Suggestion</Typography>
        <Typography variant="body2">{moodPredictionText}</Typography>
      </div>
      {/* Daily Affirmation */}
      <div className="mb-4 p-3 rounded bg-[#5A9CA4]">
        <Typography variant="subtitle1" className="text-[#F6F8F9] mb-1">Daily Affirmation</Typography>
        <Typography variant="body2" className="text-[#F6F8F9]">{todayAffirmation}</Typography>
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
