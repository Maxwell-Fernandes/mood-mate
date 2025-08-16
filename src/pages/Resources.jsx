import { Typography, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import { Box, Card, CardContent, CardMedia, Button, TextField, CircularProgress, List, ListItem, ListItemText } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useMoodStore from '../store/useMoodStore'

// Guided Meditation Section (static demo)
const meditations = [
  {
    title: '5-Minute Mindful Breathing',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'A short breathing exercise to help you relax.'
  },
  {
    title: 'Body Scan Meditation',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Bring awareness to each part of your body.'
  }
]

// Spotify Mood Playlist Section
const moodPlaylists = {
  happy: '37i9dQZF1DXdPec7aLTmlC',
  sad: '37i9dQZF1DWVV27DiNWxkR',
  calm: '37i9dQZF1DX4sWSpwq3LiO',
  energetic: '37i9dQZF1DX70RN3TfWWJh',
}

function getSpotifyToken() {
  // In production, use a backend to keep secret safe
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  }).then(res => res.json()).then(data => data.access_token)
}

function useSpotifyPlaylist(mood) {
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!mood) return
    setLoading(true)
    setError(null)
    getSpotifyToken().then(token => {
      // Use search API to find a playlist by mood
      fetch(`https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=1`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) {
            setError(`Spotify search error: ${res.status} ${res.statusText}`)
            setLoading(false)
            return null
          }
          return res.json()
        })
        .then(searchData => {
          if (searchData && searchData.playlists && searchData.playlists.items.length > 0) {
            const playlistId = searchData.playlists.items[0].id
            // Fetch playlist details
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(res => {
                if (!res.ok) {
                  setError(`Spotify playlist error: ${res.status} ${res.statusText}`)
                  setLoading(false)
                  return null
                }
                return res.json()
              })
              .then(data => {
                if (data) setPlaylist(data)
                setLoading(false)
              })
              .catch(err => {
                setError(`Network error: ${err.message}`)
                setLoading(false)
              })
          } else {
            setError('No playlist found for this mood.')
            setLoading(false)
          }
        })
        .catch(err => {
          setError(`Network error: ${err.message}`)
          setLoading(false)
        })
    })
  }, [mood])
  return { playlist, loading, error }
}

// YouTube Videos Section
function useYouTubeVideos(mood) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!mood) return
    setLoading(true)
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${mood}+meditation&maxResults=5&type=video&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data.items || [])
        setLoading(false)
      })
  }, [mood])
  return { videos, loading }
}

export default function Resources() {
  const moodFromStore = useMoodStore(state => state.mood)
  const [selectedMood, setSelectedMood] = useState(moodFromStore || 'happy')
  useEffect(() => {
    if (moodFromStore && moodFromStore !== selectedMood) {
      setSelectedMood(moodFromStore)
    }
  }, [moodFromStore])
  const { playlist, loading: spotifyLoading, error: spotifyError } = useSpotifyPlaylist(selectedMood)
  const { videos, loading: youtubeLoading } = useYouTubeVideos(selectedMood)
  return (
    <Paper elevation={3} className="p-8 w-full max-w-4xl mx-auto bg-[#F6F8F9]">
      <Typography variant="h4" className="text-[#5A9CA4] mb-4">Resources</Typography>
      <Typography variant="body1" className="text-[#22223B] mb-6">
        Explore guided meditations, mood-based Spotify playlists, and YouTube videos to support your mental wellness.
      </Typography>
      {/* Mood Selection */}
      <Box className="mb-6 flex gap-2">
        {Object.keys(moodPlaylists).map(mood => (
          <Button key={mood} variant={selectedMood === mood ? 'contained' : 'outlined'} sx={{ bgcolor: selectedMood === mood ? '#5A9CA4' : undefined, color: '#22223B', '&:hover': { bgcolor: '#F7C873', color: '#22223B' } }} onClick={() => setSelectedMood(mood)}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</Button>
        ))}
      </Box>
      {/* Guided Meditation Section */}
      <Typography variant="h5" className="mb-2 text-[#5A9CA4]">Guided Meditations</Typography>
      <Box className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {meditations.map(med => (
          <Card key={med.title} className="flex flex-col">
            <CardContent>
              <Typography variant="h6">{med.title}</Typography>
              <Typography variant="body2" className="mb-2">{med.description}</Typography>
              <audio controls src={med.audio} style={{ width: '100%' }} />
            </CardContent>
          </Card>
        ))}
      </Box>
      {/* Spotify Mood Playlist Section */}
      <Typography variant="h5" className="mb-2 text-[#5A9CA4]">Spotify Mood Playlist</Typography>
      <Box className="mb-6">
        {spotifyLoading && <CircularProgress />}
        {spotifyError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {spotifyError}
          </Typography>
        )}
        {playlist && playlist.tracks && playlist.tracks.items ? (
          <Card className="flex flex-col md:flex-row">
            <CardMedia image={playlist.images?.[0]?.url} title={playlist.name} sx={{ width: 160, height: 160 }} />
            <CardContent>
              <Typography variant="h6">{playlist.name}</Typography>
              <Typography variant="body2" className="mb-2">{playlist.description}</Typography>
              <List>
                {playlist.tracks.items.slice(0, 5).map((item, idx) => (
                  <ListItem key={idx} component="a" href={item.track.external_urls.spotify} target="_blank" rel="noopener">
                    <PlayArrowIcon sx={{ mr: 1 }} />
                    <ListItemText primary={item.track.name} secondary={item.track.artists.map(a => a.name).join(', ')} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          !spotifyLoading && !spotifyError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Playlist not found or unavailable.
            </Typography>
          )
        )}
      </Box>
      {/* YouTube Videos Section */}
      <Typography variant="h5" className="mb-2 text-[#5A9CA4]">YouTube Videos</Typography>
      <Box className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {youtubeLoading && <CircularProgress />}
        {videos.map(video => (
          <Card key={video.id.videoId} className="flex flex-col">
            <CardMedia image={video.snippet.thumbnails.medium.url} title={video.snippet.title} sx={{ height: 160 }} />
            <CardContent>
              <Typography variant="h6">{video.snippet.title}</Typography>
              <Typography variant="body2" className="mb-2">{video.snippet.channelTitle}</Typography>
              <Button variant="contained" color="primary" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener">Watch</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  )
}
