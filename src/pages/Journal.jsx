import { Typography, Paper, Button, TextField, Chip, IconButton, Box, CircularProgress, Alert, Stack, Divider } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import WorkIcon from '@mui/icons-material/Work';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import PsychologyIcon from '@mui/icons-material/Psychology'; // For AI Insights heading
import HistoryIcon from '@mui/icons-material/History'; // For journal history
import SaveIcon from '@mui/icons-material/Save'; // For save button
import AnalyticsIcon from '@mui/icons-material/Analytics'; // For analyze button
import LabelImportantIcon from '@mui/icons-material/LabelImportant'; // For Add Context heading
import EventNoteIcon from '@mui/icons-material/EventNote'; // For date in entries
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // For tags in entries
import { useState } from 'react';
import OpenAI from "openai";

const TAGS = [
  { label: 'Work', icon: <WorkIcon /> },
  { label: 'Exercise', icon: <FitnessCenterIcon /> },
  { label: 'Family', icon: <FamilyRestroomIcon /> },
  { label: 'Good Meal', icon: <RestaurantIcon /> },
];

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleTagClick = (label) => {
    setSelectedTags(tags =>
      tags.includes(label) ? tags.filter(t => t !== label) : [...tags, label]
    );
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: import.meta.env.VITE_HF_TOKEN,
    dangerouslyAllowBrowser: true,
  });

  const handleAnalyze = async () => {
    if (!entry) return;
    setIsLoading(true);
    setAnalysis(null);
    try {
      const chatCompletion = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:fireworks-ai",
        messages: [
          {
            role: "user",
            content: `Analyze this journal entry: "${entry}". 
            Respond ONLY with raw JSON in this format:
            { "mood": "...", "confidence": 0.95, "summary": "...", "trigger": "..." }`,
          },
        ],
      });

      let content = chatCompletion.choices[0].message.content.trim();
      if (content.startsWith("```")) {
        content = content.replace(/```json|```/g, "").trim();
      }
      const parsed = JSON.parse(content);
      setAnalysis(parsed);
    } catch (err) {
      console.error("AI analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = () => {
    if (!entry.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      text: entry,
      tags: selectedTags,
      analysis: analysis,
      photo: photo,
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    setEntry('');
    setSelectedTags([]);
    setAnalysis(null);
    setPhoto(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  
  return (
    <Box className="p-8 max-w-3xl mx-auto" sx={{ backgroundColor: '#F7F9FB', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" className="font-bold text-[#22223B]">
        📝 Your Daily Journal
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'gray', mb: 4 }}>
        Reflect. Analyze. Improve.
      </Typography>

      {/* Tag selection */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <LabelImportantIcon color="primary" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
            Add context:
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {TAGS.map(tag => (
            <Chip
              key={tag.label}
              icon={tag.icon}
              label={tag.label}
              onClick={() => handleTagClick(tag.label)}
              variant={selectedTags.includes(tag.label) ? "filled" : "outlined"}
              sx={{
                backgroundColor: selectedTags.includes(tag.label) ? '#5A9CA4' : 'transparent',
                color: selectedTags.includes(tag.label) ? 'white' : '#22223B',
                borderColor: '#5A9CA4',
                '&:hover': { backgroundColor: '#4A8C94', color: 'white' }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Journal text input */}
      <TextField
        label="What's on your mind?"
        multiline
        rows={6}
        fullWidth
        value={entry}
        onChange={e => setEntry(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          backgroundColor: 'white',
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': { borderColor: '#5A9CA4' }
          }
        }}
      />

      {/* Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={isLoading || !entry}
            startIcon={<AnalyticsIcon />}
            sx={{
              bgcolor: '#22223B',
              '&:hover': { bgcolor: '#5A9CA4' },
              textTransform: 'none'
            }}
          >
            {isLoading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Analyze Mood'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleSaveEntry}
            startIcon={<SaveIcon />}
            sx={{
              borderColor: '#22223B',
              color: '#22223B',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#5A9CA4',
                color: '#5A9CA4'
              }
            }}
          >
            Save Entry
          </Button>
        </Stack>

        <label htmlFor="upload-photo">
          <input hidden accept="image/*" id="upload-photo" type="file" onChange={handlePhotoChange} />
          <IconButton component="span" sx={{ color: '#5A9CA4' }}>
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>

      {/* Photo preview */}
      {photo && (
        <Box textAlign="center" mb={4}>
          <img src={photo} alt="preview" style={{ maxHeight: 180, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        </Box>
      )}

      {/* AI Insights */}
      {analysis && (
        <Alert severity="success" variant="outlined" sx={{ mb: 4, borderColor: '#5A9CA4', bgcolor: '#E0F4F7' }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <PsychologyIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">Instant Insights</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Mood:</strong> {analysis.mood}</Typography>
          <Typography><strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%</Typography>
          <Typography sx={{ mt: 1 }}><strong>Summary:</strong> {analysis.summary}</Typography>
          <Typography><strong>Trigger:</strong> {analysis.trigger}</Typography>
        </Alert>
      )}

      {/* Previous entries */}
      {entries.length > 0 && (
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <HistoryIcon color="primary" />
            <Typography variant="h6" fontWeight="bold" color="#22223B">Journal History</Typography>
          </Stack>
          <Stack spacing={2}>
            {entries.slice().reverse().map(entry => (
              <Paper key={entry.id} elevation={1} sx={{ p: 2, borderLeft: '4px solid #5A9CA4', bgcolor: 'white' }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <EventNoteIcon fontSize="small" color="disabled" />
                  <Typography variant="caption" color="textSecondary">{new Date(entry.date).toLocaleString()}</Typography>
                </Stack>

                <Typography variant="body1" sx={{ mt: 1 }}>{entry.text}</Typography>

                {entry.tags?.length > 0 && (
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <LocalOfferIcon fontSize="small" color="disabled" />
                    {entry.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#C4E2E6' }} />
                    ))}
                  </Stack>
                )}

                {entry.analysis && (
                  <Box mt={1}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      <strong>Mood:</strong> {entry.analysis.mood} ({(entry.analysis.confidence * 100).toFixed(0)}%)
                    </Typography>
                    <Typography variant="body2" fontStyle="italic">{entry.analysis.summary}</Typography>
                  </Box>
                )}

                {entry.photo && (
                  <Box mt={2}>
                    <img src={entry.photo} alt="entry" className="rounded-md shadow-sm" style={{ maxHeight: 100 }} />
                  </Box>
                )}
              </Paper>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
