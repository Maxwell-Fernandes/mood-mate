import { Typography, Paper, Button, ToggleButton, ToggleButtonGroup, Avatar, TextField, Stepper, Step, StepLabel, Box } from '@mui/material'
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

const assessmentQuestions = [
  {
    question: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you not been able to stop or control worrying?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
]

export default function Profile() {
  const [theme, setTheme] = useState('light')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(assessmentQuestions.length).fill(''))
  const handleThemeChange = (_, newTheme) => {
    if (newTheme) setTheme(newTheme)
  }
  const handleOptionSelect = (option) => {
    const updated = [...answers]
    updated[step] = option
    setAnswers(updated)
  }
  const handleNext = () => {
    if (step < assessmentQuestions.length - 1) setStep(step + 1)
  }
  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }
  // Profile mock data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '', // Add avatar URL if available
  }
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto" style={{ background: themes[theme].background, color: themes[theme].color }}>
      <Box className="flex flex-col items-center mb-6">
        <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h5" style={{ color: themes[theme].color }}>{user.name}</Typography>
        <Typography variant="body2" style={{ color: themes[theme].color }}>{user.email}</Typography>
      </Box>
      <Typography variant="h4" className="mb-4" style={{ color: themes[theme].color }}>Profile</Typography>
      <Typography variant="body1" style={{ color: themes[theme].color }}>
        View and edit your personal information and preferences.
      </Typography>
      <div className="mt-6 mb-8">
        <Typography variant="subtitle1" className="mb-2" style={{ color: themes[theme].color }}>Theme Customization</Typography>
        <ToggleButtonGroup value={theme} exclusive onChange={handleThemeChange}>
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
          <ToggleButton value="colorful">Colorful</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* Assessment Stepper */}
      <Box className="mb-6">
        <Stepper activeStep={step} alternativeLabel>
          {assessmentQuestions.map((q, idx) => (
            <Step key={idx}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box className="mb-4">
        <Typography variant="h6" className="mb-2" style={{ color: themes[theme].color }}>
          {assessmentQuestions[step].question}
        </Typography>
        <div className="flex flex-col gap-2">
          {assessmentQuestions[step].options.map(option => (
            <Button
              key={option}
              variant={answers[step] === option ? 'contained' : 'outlined'}
              sx={{ bgcolor: answers[step] === option ? '#ECA7A7' : undefined, color: '#22223B', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </Box>
      <Box className="flex justify-between mt-4">
        <Button onClick={handleBack} disabled={step === 0}>Back</Button>
        <Button onClick={handleNext} disabled={step === assessmentQuestions.length - 1 || !answers[step]}>Next</Button>
      </Box>
    </Paper>
  )
}