import { Typography, Paper, Button, TextField, Chip, IconButton, Box, CircularProgress, Alert } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import WorkIcon from '@mui/icons-material/Work';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState, useEffect } from 'react';
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

  // ❌ removed: load last entry from localStorage
  // useEffect(() => {
  //   const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  //   if (savedEntries.length > 0) {
  //     const lastEntry = savedEntries[savedEntries.length - 1];
  //     setEntry(lastEntry.text);
  //     setSelectedTags(lastEntry.tags || []);
  //     setAnalysis(lastEntry.analysis || null);
  //   }
  // }, []);

  // ❌ removed: load all entries on mount
  // useEffect(() => {
  //   const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  //   setEntries(savedEntries);
  // }, []);

  const handleTagClick = (label) => {
    setSelectedTags(tags => tags.includes(label) ? tags.filter(t => t !== label) : [...tags, label]);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Hugging Face / Fireworks client
  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: import.meta.env.VITE_HF_TOKEN,   // visible in browser – fine for hackathon/demo
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

  // updated save (❌ removed localStorage)
  const handleSaveEntry = () => {
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

    // ❌ removed: localStorage.setItem('journalEntries', JSON.stringify(updated));

    // clear input + states
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
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-white">
      <Typography variant="h4" className="text-[#5A9CA4] mb-4">How are you feeling?</Typography>

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

      {/* Entry field */}
      <TextField
        label="Your Journal Entry"
        multiline
        rows={8}
        fullWidth
        value={entry}
        onChange={e => setEntry(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-4"
      />

      {/* Action Buttons */}
      <Box className="flex items-center gap-4 mb-4">
        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={isLoading}
          sx={{ bgcolor: '#ECA7A7', '&:hover': { bgcolor: '#F7C873' } }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Analyze Mood'}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveEntry}>
          Save Entry
        </Button>

        <input accept="image/*" style={{ display: 'none' }} id="photo-upload" type="file" onChange={handlePhotoChange} />
        <label htmlFor="photo-upload">
          <IconButton color="primary" component="span"><PhotoCamera /></IconButton>
        </label>
      </Box>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <div className="mt-6">
          <Typography variant="h6" className="text-[#5A9CA4] mb-2">Previous Entries</Typography>
          {entries.slice().reverse().map(e => (
            <Paper key={e.id} elevation={1} className="p-3 mb-2 bg-[#F6F8F9]">
              <Typography variant="body2" className="text-gray-600">
                {new Date(e.date).toLocaleString()}
              </Typography>
              <Typography variant="body1" className="mb-1">{e.text}</Typography>
              {e.tags?.length > 0 && (
                <div className="flex gap-1 flex-wrap mb-1">
                  {e.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
                </div>
              )}
              {e.analysis && (
                <Typography variant="body2" className="text-sm text-gray-700">
                  Mood: {e.analysis.mood} • {e.analysis.summary}
                </Typography>
              )}
              {e.photo && <img src={e.photo} alt="Journal" className="h-16 mt-1 rounded" />}
            </Paper>
          ))}
        </div>
      )}

      {/* Display AI Analysis */}
      {analysis && (
        <Alert severity="success" variant="outlined">
          <Typography variant="h6">Instant Insights</Typography>
          <Typography variant="body1">
            <strong>Detected Mood:</strong> {analysis.mood} (Confidence: {(analysis.confidence * 100).toFixed(0)}%)
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Summary:</strong> {analysis.summary}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Potential Mood Trigger:</strong> {analysis.trigger}
          </Typography>
        </Alert>
      )}

      {photo && <img src={photo} alt="Journal attachment" className="h-24 rounded mt-4" />}
    </Paper>
  );
}



// import { Typography, Paper, Button, TextField, Chip, IconButton, Box, CircularProgress, Alert } from '@mui/material'; import PhotoCamera from '@mui/icons-material/PhotoCamera'; import WorkIcon from '@mui/icons-material/Work'; import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; import RestaurantIcon from '@mui/icons-material/Restaurant'; import { useState, useEffect } from 'react'; import OpenAI from "openai"; const TAGS = [ { label: 'Work', icon: <WorkIcon /> }, { label: 'Exercise', icon: <FitnessCenterIcon /> }, { label: 'Family', icon: <FamilyRestroomIcon /> }, { label: 'Good Meal', icon: <RestaurantIcon /> }, ]; export default function JournalPage() { const [entry, setEntry] = useState(''); const [selectedTags, setSelectedTags] = useState([]); const [photo, setPhoto] = useState(null); const [entries, setEntries] = useState([]); const [isLoading, setIsLoading] = useState(false); const [analysis, setAnalysis] = useState(null); // Load last entry on mount useEffect(() => { const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || []; if (savedEntries.length > 0) { const lastEntry = savedEntries[savedEntries.length - 1]; setEntry(lastEntry.text); setSelectedTags(lastEntry.tags || []); setAnalysis(lastEntry.analysis || null); } }, []); // load all entries on mount useEffect(() => { const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || []; setEntries(savedEntries); }, []); const handleTagClick = (label) => { setSelectedTags(tags => tags.includes(label) ? tags.filter(t => t !== label) : [...tags, label]); }; const handlePhotoChange = (e) => { if (e.target.files && e.target.files[0]) { setPhoto(URL.createObjectURL(e.target.files[0])); } }; // Hugging Face / Fireworks client const client = new OpenAI({ baseURL: "https://router.huggingface.co/v1", apiKey: import.meta.env.VITE_HF_TOKEN, // visible in browser – fine for hackathon/demo dangerouslyAllowBrowser: true, }); const handleAnalyze = async () => { if (!entry) return; setIsLoading(true); setAnalysis(null); try { const chatCompletion = await client.chat.completions.create({ model: "openai/gpt-oss-20b:fireworks-ai", // ⚠️ requires HF token with inference perms messages: [ { role: "user", content: Analyze this journal entry: "${entry}". Respond ONLY with raw JSON in this format: { "mood": "...", "confidence": 0.95, "summary": "...", "trigger": "..." }, }, ], }); let content = chatCompletion.choices[0].message.content.trim(); // ✅ Strip markdown fences if model wraps in
// json ...
// if (content.startsWith("
// ")) {
//         content = content.replace(/
// json|
// /g, "").trim();
//       }

//       const parsed = JSON.parse(content);
//       setAnalysis(parsed);

//     } catch (err) {
//       console.error("AI analysis failed:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleSaveEntry = () => {
//   //   const newEntry = {
//   //     id: Date.now(),
//   //     date: new Date().toISOString(),
//   //     text: entry,
//   //     tags: selectedTags,
//   //     analysis: analysis,
//   //     photo: photo,
//   //   };

//   //   const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
//   //   savedEntries.push(newEntry);
//   //   localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

//   //   alert('Entry Saved!');
//   // };

//   // updated save
// const handleSaveEntry = () => {
//   const newEntry = {
//     id: Date.now(),
//     date: new Date().toISOString(),
//     text: entry,
//     tags: selectedTags,
//     analysis: analysis,
//     photo: photo,
//   };

//   const updated = [...entries, newEntry];
//   setEntries(updated);
//   localStorage.setItem('journalEntries', JSON.stringify(updated));

//   // clear input + states
//   setEntry('');
//   setSelectedTags([]);
//   setAnalysis(null);
//   setPhoto(null);
// };

// const handleKeyDown = (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     handleAnalyze();
//   }
// };


//   return (
//     <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-white">
//       <Typography variant="h4" className="text-[#5A9CA4] mb-4">How are you feeling?</Typography>

//       {/* Tag selection */}
//       <div className="mb-4 flex gap-2 flex-wrap">
//         {TAGS.map(tag => (
//           <Chip
//             key={tag.label}
//             icon={tag.icon}
//             label={tag.label}
//             color={selectedTags.includes(tag.label) ? 'primary' : 'default'}
//             onClick={() => handleTagClick(tag.label)}
//           />
//         ))}
//       </div>

//       {/* Entry field */}
//       <TextField
//         label="Your Journal Entry"
//         multiline
//         rows={8}
//         fullWidth
//         value={entry}
//         onChange={e => setEntry(e.target.value)}
//         className="mb-4"
//       />

//       {/* Action Buttons */}
//       <Box className="flex items-center gap-4 mb-4">
//         <Button
//           variant="contained"
//           onClick={handleAnalyze}
//           disabled={isLoading}
//           sx={{ bgcolor: '#ECA7A7', '&:hover': { bgcolor: '#F7C873' } }}
//         >
//           {isLoading ? <CircularProgress size={24} /> : 'Analyze Mood'}
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleSaveEntry}>
//           Save Entry
//         </Button>

//         <input accept="image/*" style={{ display: 'none' }} id="photo-upload" type="file" onChange={handlePhotoChange} />
//         <label htmlFor="photo-upload">
//           <IconButton color="primary" component="span"><PhotoCamera /></IconButton>
//         </label>
//       </Box>

//       {/* Previous Entries */}
// {entries.length > 0 && (
//   <div className="mt-6">
//     <Typography variant="h6" className="text-[#5A9CA4] mb-2">Previous Entries</Typography>
//     {entries.slice().reverse().map(e => (
//       <Paper key={e.id} elevation={1} className="p-3 mb-2 bg-[#F6F8F9]">
//         <Typography variant="body2" className="text-gray-600">
//           {new Date(e.date).toLocaleString()}
//         </Typography>
//         <Typography variant="body1" className="mb-1">{e.text}</Typography>
//         {e.tags?.length > 0 && (
//           <div className="flex gap-1 flex-wrap mb-1">
//             {e.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
//           </div>
//         )}
//         {e.analysis && (
//           <Typography variant="body2" className="text-sm text-gray-700">
//             Mood: {e.analysis.mood} • {e.analysis.summary}
//           </Typography>
//         )}
//         {e.photo && <img src={e.photo} alt="Journal" className="h-16 mt-1 rounded" />}
//       </Paper>
//     ))}
//   </div>
// )}


//       {/* Display AI Analysis */}
//       {analysis && (
//         <Alert severity="success" variant="outlined">
//           <Typography variant="h6">Instant Insights</Typography>
//           <Typography variant="body1">
//             <strong>Detected Mood:</strong> {analysis.mood} (Confidence: {(analysis.confidence * 100).toFixed(0)}%)
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             <strong>Summary:</strong> {analysis.summary}
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             <strong>Potential Mood Trigger:</strong> {analysis.trigger}
//           </Typography>
//         </Alert>
//       )}

//       {photo && <img src={photo} alt="Journal attachment" className="h-24 rounded mt-4" />}
//     </Paper>
//   );
// }
