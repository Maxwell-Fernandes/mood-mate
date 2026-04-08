import { Typography, Box, Card, CardContent, CardMedia, Button, CircularProgress, List, ListItem, ListItemText, Paper } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState, useEffect } from 'react'
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

// Spotify Mood Playlist Section (not used directly but for reference)
const moodPlaylists = {
  happy: '37i9dQZF1DXdPec7aLTmlC',
  sad: '37i9dQZF1DWVV27DiNWxkR',
  calm: '37i9dQZF1DX4sWSpwq3LiO',
  energetic: '37i9dQZF1DX70RN3TfWWJh',
}

// Helper to get Spotify token
function getSpotifyToken() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  })
    .then(res => res.json())
    .then(data => data.access_token)
}

// Hook to fetch Spotify playlist based on mood
function useSpotifyPlaylist(mood) {
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!mood) return
    setLoading(true)
    setError(null)

    getSpotifyToken().then(token => {
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

// Hook to fetch YouTube videos based on mood
function useYouTubeVideos(mood) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!mood) return
    setLoading(true)
    setError(null)

    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${mood}+meditation&maxResults=5&type=video&key=${apiKey}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`YouTube API error: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then(data => {
        if (data.error) {
          setError(data.error.message)
          setVideos([])
        } else {
          setVideos(data.items || [])
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [mood])

  return { videos, loading, error }
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
    <Paper
      elevation={6}
      sx={{
        p: 6,
        maxWidth: 1100,
        mx: 'auto',
        mt: 6,
        bgcolor: '#FFFFFF',
        borderRadius: 3,
        boxShadow: '0 10px 20px rgba(90,156,164,0.2)',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#5A9CA4',
          fontWeight: '700',
          mb: 3,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          letterSpacing: 1.2,
        }}
      >
        Resources
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#22223B',
          mb: 6,
          fontSize: '1.15rem',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        Explore guided meditations, mood-based Spotify playlists, and YouTube videos to support your mental wellness.
      </Typography>

      {/* Mood Selection */}
      <Box sx={{ mb: 6, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {Object.keys(moodPlaylists).map(mood => (
          <Button
            key={mood}
            variant={selectedMood === mood ? 'contained' : 'outlined'}
            sx={{
              bgcolor: selectedMood === mood ? '#5A9CA4' : undefined,
              color: selectedMood === mood ? '#fff' : '#22223B',
              px: 3,
              py: 1,
              textTransform: 'capitalize',
              fontWeight: '600',
              borderRadius: 3,
              boxShadow: selectedMood === mood ? '0 4px 10px rgba(90,156,164,0.3)' : undefined,
              '&:hover': {
                bgcolor: '#F7C873',
                color: '#22223B',
                boxShadow: '0 6px 15px rgba(247,200,115,0.4)',
              },
            }}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </Button>
        ))}
      </Box>

      {/* Guided Meditation Section */}
      <Typography variant="h4" sx={{ mb: 3, color: '#5A9CA4', fontWeight: 700 }}>
        Guided Meditations
      </Typography>
      <Box
        sx={{
          mb: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 3,
        }}
      >
        {meditations.map(med => (
          <Card key={med.title} sx={{ boxShadow: '0 4px 15px rgba(90,156,164,0.15)', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {med.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                {med.description}
              </Typography>
              <audio controls src={med.audio} style={{ width: '100%', borderRadius: 5 }} />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Spotify Mood Playlist Section */}
      <Typography variant="h4" sx={{ mb: 3, color: '#5A9CA4', fontWeight: 700 }}>
        Spotify Mood Playlist
      </Typography>
      <Box sx={{ mb: 8, minHeight: 180 }}>
        {spotifyLoading && <CircularProgress />}
        {spotifyError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {spotifyError}
          </Typography>
        )}
        {playlist && playlist.tracks && playlist.tracks.items ? (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              boxShadow: '0 6px 25px rgba(90,156,164,0.2)',
              borderRadius: 4,
            }}
          >
            <CardMedia
              image={playlist.images?.[0]?.url}
              title={playlist.name}
              sx={{ width: { xs: '100%', md: 200 }, height: 200, borderRadius: { xs: '4px 4px 0 0', md: '4px 0 0 4px' } }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {playlist.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
                {playlist.description}
              </Typography>
              <List sx={{ maxHeight: 180, overflowY: 'auto' }}>
                {playlist.tracks.items.slice(0, 5).map((item, idx) => (
                  <ListItem
                    key={idx}
                    component="a"
                    href={item.track.external_urls.spotify}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                      mb: 1,
                      '&:hover': { bgcolor: '#E6F2F5' },
                    }}
                  >
                    <PlayArrowIcon sx={{ mr: 2, color: '#5A9CA4' }} />
                    <ListItemText
                      primary={item.track.name}
                      secondary={item.track.artists.map(a => a.name).join(', ')}
                      primaryTypographyProps={{ fontWeight: 600 }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          !spotifyLoading &&
          !spotifyError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Playlist not found or unavailable.
            </Typography>
          )
        )}
      </Box>

      {/* YouTube Videos Section */}
      <Typography variant="h4" sx={{ mb: 3, color: '#5A9CA4', fontWeight: 700 }}>
        YouTube Videos
      </Typography>
      <Box
        sx={{
          mb: 6,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 3,
        }}
      >
        {youtubeLoading && <CircularProgress />}
        {videos.map(video => (
          <Card
            key={video.id.videoId}
            sx={{
              boxShadow: '0 4px 15px rgba(90,156,164,0.15)',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardMedia
              image={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              sx={{ height: 180, borderRadius: '4px 4px 0 0' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {video.snippet.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>
                {video.snippet.channelTitle}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener"
                sx={{ borderRadius: 3, fontWeight: 700 }}
              >
                Watch
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  )
}
