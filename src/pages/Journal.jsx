import { Typography, Paper, Button, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import WorkIcon from '@mui/icons-material/Work'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useState } from 'react'

const TAGS = [
  { label: 'Work', icon: <WorkIcon /> },
  { label: 'Exercise', icon: <FitnessCenterIcon /> },
  { label: 'Family', icon: <FamilyRestroomIcon /> },
  { label: 'Good Meal', icon: <RestaurantIcon /> },
]

const PROMPTS = {
  gratitude: [
    'What are three things you’re grateful for today?',
    'Who made you smile today?',
    'What is something positive that happened today?'
  ],
  cbt: [
    'Describe a negative thought you had.',
    'What evidence supports or contradicts this thought?',
    'What is a more balanced perspective?'
  ]
}

export default function Journal() {
  const [entry, setEntry] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [photo, setPhoto] = useState(null)
  const [promptType, setPromptType] = useState('')

  // Privacy Lock state
  const [pinDialogOpen, setPinDialogOpen] = useState(true)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const correctPin = '1234' // Demo PIN
  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setPinDialogOpen(false)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  const handleTagClick = (label) => {
    setSelectedTags(tags => tags.includes(label) ? tags.filter(t => t !== label) : [...tags, label])
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]))
    }
  }

  // Export journal entry as text file
  const handleExport = () => {
    const blob = new Blob([entry], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'journal-entry.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Dialog open={pinDialogOpen}>
        <DialogTitle>Enter PIN to Access Journal</DialogTitle>
        <DialogContent>
          <MuiTextField
            label="PIN"
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            error={!!error}
            helperText={error}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePinSubmit} variant="contained">Unlock</Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-[#F6F8F9]">
        <Typography variant="h4" className="text-[#5A9CA4] mb-4">Journal</Typography>
        <Typography variant="body1" className="text-[#22223B] mb-4">
          Write about your thoughts, feelings, and experiences here.
        </Typography>
        {/* Tag selection */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {TAGS.map(tag => (
            <Chip
              key={tag.label}
              icon={tag.icon}
              label={tag.label}
              color={selectedTags.includes(tag.label) ? 'primary' : 'default'}
              onClick={() => handleTagClick(tag.label)}
            />
          ))}
        </div>
        {/* Prompt buttons */}
        <div className="mb-4 flex gap-2">
          <Button variant="outlined" onClick={() => setPromptType('gratitude')}>Gratitude Journal</Button>
          <Button variant="outlined" onClick={() => setPromptType('cbt')}>CBT Thought Record</Button>
          <Button variant="text" onClick={() => setPromptType('')}>Blank Entry</Button>
        </div>
        {/* Prompts */}
        {promptType && (
          <div className="mb-4">
            {PROMPTS[promptType].map((p, i) => (
              <Typography key={i} variant="body2" className="mb-2 text-[#5A9CA4]">{p}</Typography>
            ))}
          </div>
        )}
        {/* Entry field */}
        <TextField
          label="Your Journal Entry"
          multiline
          rows={6}
          fullWidth
          value={entry}
          onChange={e => setEntry(e.target.value)}
          className="mb-4"
        />
        {/* Photo attachment */}
        <div className="mb-4 flex items-center gap-2">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="photo-upload"
            type="file"
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {photo && <img src={photo} alt="Journal attachment" className="h-16 rounded" />}
        </div>
       
        <Button variant="contained" sx={{ bgcolor: '#ECA7A7', color: '#22223B', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }}>
          Save Entry
        </Button>
        <Button variant="outlined" startIcon={<FileDownloadIcon />} sx={{ ml: 2 }} onClick={handleExport}>
          Export Journal
        </Button>
      </Paper>
    </>
  )
}
