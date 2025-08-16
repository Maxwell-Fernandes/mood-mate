import { Typography, Paper, Button, TextField, Chip, IconButton } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import WorkIcon from '@mui/icons-material/Work'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import RestaurantIcon from '@mui/icons-material/Restaurant'
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

  const handleTagClick = (label) => {
    setSelectedTags(tags => tags.includes(label) ? tags.filter(t => t !== label) : [...tags, label])
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
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
    </Paper>
  )
}
