import React from 'react';
import { Typography, Paper, Grid, Box, LinearProgress, IconButton, Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for mood tracking features
const userData = {
  name: 'Skylar Dias',
  profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

const dailyMoodData = [
  { name: 'S', mood: 1 }, // 1 = Sad
  { name: 'M', mood: 3 }, // 3 = Neutral
  { name: 'T', mood: 1 }, // 1 = Sad
  { name: 'W', mood: 4 }, // 4 = Happy
  { name: 'T', mood: 2 }, // 2 = Anxious
  { name: 'F', mood: 3 }, // 3 = Neutral
  { name: 'S', mood: 5 }, // 5 = Ecstatic
];

const moodDistribution = [
  { name: 'Happy', value: 40, color: '#5A9CA4' }, // Blue
  { name: 'Neutral', value: 25, color: '#D3D3D3' }, // Light Gray
  { name: 'Anxious', value: 15, color: '#5A9CA4' }, // Blue
  { name: 'Sad', value: 20, color: '#22223B' }, // Dark Blue/Black
];

const journalEntries = [
  {
    title: 'Morning Reflections',
    summary: 'The sunny weather and a good night\'s sleep contributed to a feeling of happiness and calm.',
    mood: 'Happy',
    tips: 'Try to get some sun exposure to boost your mood!',
  },
  {
    title: 'Afternoon Struggles',
    summary: 'Felt stressed after a challenging meeting. Noticed feelings of frustration.',
    mood: 'Anxious',
    tips: 'Consider a 5-minute mindfulness exercise to recenter yourself.',
  },
];

const mainMood = 'Happy';
const moodScore = 85;

const calendarDates = [
  'July 2025',
  [10, 11, 12, 13, 14, 15, 16], // Mock week
];

const todayTask = {
  title: 'Mindful Journaling',
  role: 'Self-Care Activity',
  progress: 90,
  time: '15 Minutes',
  steps: [
    'Find a quiet space to write',
    'Reflect on your day\'s emotions',
    'Categorize your feelings',
  ],
  image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
};

const moodColors = {
  1: '#22223B', // Dark Blue for Sad
  2: '#5A9CA4', // Blue for Anxious
  3: '#F6F8F9', // Light Gray for Neutral
  4: '#5A9CA4', // Blue for Happy
  5: '#5A9CA4', // Blue for Ecstatic
};

function Dashboard() {
  return (
    <Box className="flex bg-[#F6F8F9] min-h-screen">
      {/* Main Content */}
      <Box className="flex-1 p-8">
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-[#22223B]">
            Hi, {userData.name}
            <div className="text-sm font-normal text-gray-500">Let's check in on your mood today!</div>
          </Typography>
          <Box className="flex items-center space-x-4">
            <IconButton><img src="https://i.pravatar.cc/40?u=skylar" alt="Profile" className="rounded-full w-10 h-10" /></IconButton>
          </Box>
        </Box>

        {/* Top Panels */}
        <Grid container spacing={4} className="mb-6">
          {/* Daily Mood Summary */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-6 bg-[#22223B] text-white rounded-xl h-full shadow-lg">
              <Typography variant="h6" className="text-sm">Today's Mood</Typography>
              <div className="flex items-center mt-3">
                <Typography variant="h3" className="font-bold">{mainMood}</Typography>
                <div className="ml-4">
                  <Typography variant="h6" className="font-bold text-gray-400">{moodScore}%</Typography>
                  <Typography variant="body2" className="text-gray-400">Confidence</Typography>
                </div>
              </div>
              <LinearProgress
                variant="determinate"
                value={moodScore}
                sx={{
                  bgcolor: '#D3D3D3',
                  '& .MuiLinearProgress-bar': { bgcolor: '#5A9CA4' },
                  height: 8,
                  borderRadius: 5,
                  mt: 3,
                }}
              />
            </Paper>
          </Grid>
          {/* Weekly Mood Chart */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper className="p-6 rounded-xl h-full shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <Typography variant="h6" className="text-sm">Weekly Mood Trends</Typography>
                <div className="flex items-center space-x-2">
                  <Typography variant="body2" className="text-gray-500">This Week</Typography>
                  <ArrowBackIosNewIcon sx={{ fontSize: 10, color: 'gray' }} />
                  <ArrowForwardIosIcon sx={{ fontSize: 10, color: 'gray' }} />
                </div>
              </div>
              <div className="w-full h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyMoodData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="mood" barSize={20}>
                      {dailyMoodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={moodColors[entry.mood]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Grid>
          {/* Calendar */}
          <Grid item xs={12} md={4}>
            <Paper className="p-6 rounded-xl h-full shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <Typography variant="h6" className="text-sm text-gray-500">{calendarDates[0]}</Typography>
                <div className="flex items-center space-x-2">
                  <ArrowBackIosNewIcon sx={{ fontSize: 10, color: 'gray' }} />
                  <ArrowForwardIosIcon sx={{ fontSize: 10, color: 'gray' }} />
                </div>
              </div>
              <Grid container spacing={1}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <Grid item xs={1.7} key={index} className="text-center">
                    <Typography variant="body2" className="font-bold text-gray-400">{day}</Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1} className="mt-2">
                {calendarDates[1].map((date, index) => (
                  <Grid item xs={1.7} key={index} className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${date === 16 ? 'bg-[#5A9CA4] text-white' : 'hover:bg-gray-100'}`}
                    >
                      <Typography variant="body2">{date}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Second Row Panels */}
        <Grid container spacing={4} className="mb-6">
          {/* Emotion Distribution Pie Chart */}
          <Grid item xs={12} md={8}>
            <Paper className="p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-sm">Emotion Distribution</Typography>
                <div className="flex items-center space-x-2">
                  <IconButton size="small"><ArrowBackIosNewIcon sx={{ fontSize: 14 }} /></IconButton>
                  <IconButton size="small"><ArrowForwardIosIcon sx={{ fontSize: 14 }} /></IconButton>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-8">
                <PieChart width={150} height={150}>
                  <Pie
                    data={moodDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    labelLine={false}
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div className="flex flex-col space-y-2">
                  {moodDistribution.map((mood, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mood.color }}></div>
                      <Typography variant="body2">{mood.name} ({mood.value}%)</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Paper>
          </Grid>
          {/* Current Journal Activity */}
          <Grid item xs={12} md={4}>
            <Paper className="p-6 rounded-xl h-full shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <Typography variant="h6" className="text-sm">Today's Journaling</Typography>
                <MoreHorizIcon sx={{ color: 'gray' }} />
              </div>
              <div className="relative">
                <img src={todayTask.image} alt="Journal" className="w-full h-32 object-cover rounded-xl" />
              </div>
              <Typography variant="subtitle1" className="font-bold mt-3">{todayTask.title}</Typography>
              <Typography variant="body2" className="text-gray-500 text-sm mb-2">{todayTask.role}</Typography>
              <div className="flex items-center justify-between">
                <Typography variant="body2" className="text-sm">Progress</Typography>
                <Typography variant="body2" className="font-bold text-sm text-[#5A9CA4]">{todayTask.progress}%</Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={todayTask.progress}
                sx={{
                  bgcolor: '#D3D3D3',
                  '& .MuiLinearProgress-bar': { bgcolor: '#5A9CA4' },
                  height: 6,
                  borderRadius: 5,
                  mt: 1,
                }}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <CalendarTodayIcon sx={{ fontSize: 14 }} />
                  <Typography variant="body2">{todayTask.time}</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Instant Insights Section */}
        <Box>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="text-sm">Instant Insights</Typography>
            <div className="flex items-center space-x-2">
              <IconButton size="small"><ArrowBackIosNewIcon sx={{ fontSize: 14 }} /></IconButton>
              <IconButton size="small"><ArrowForwardIosIcon sx={{ fontSize: 14 }} /></IconButton>
            </div>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-2 hide-scrollbar">
            {journalEntries.map((entry, index) => (
              <Paper key={index} className="flex-none p-6 w-64 rounded-xl shadow-md bg-[#F0F0F0]">
                <Typography variant="subtitle1" className="font-bold text-sm">{entry.title}</Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">{entry.summary}</Typography>
                <div className="mt-3 text-xs">
                  <span className={`px-2 py-1 rounded-full text-white ${entry.mood === 'Happy' ? 'bg-[#5A9CA4]' : 'bg-[#22223B]'}`}>{entry.mood}</span>
                </div>
                <Typography variant="body2" className="text-gray-500 mt-2 italic">Tip: {entry.tips}</Typography>
              </Paper>
            ))}
          </div>
        </Box>
      </Box>

      {/* Right Sidebar (Journaling Details) */}
      <Box className="w-[300px] bg-white p-6 flex flex-col border-l border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="text-sm">Journaling Today</Typography>
          <MoreHorizIcon sx={{ color: 'gray' }} />
        </div>
        <div className="relative mb-4">
          <img src={todayTask.image} alt="Journaling" className="w-full h-32 object-cover rounded-xl" />
        </div>
        <Typography variant="h6" className="font-bold">{todayTask.title}</Typography>
        <Typography variant="body2" className="text-gray-500 mb-3">{todayTask.role}</Typography>

        <div className="flex items-center justify-between mb-4">
          <Typography variant="body2">Progress</Typography>
          <Typography variant="body2" className="font-bold text-[#5A9CA4]">{todayTask.progress}%</Typography>
        </div>
        <LinearProgress
          variant="determinate"
          value={todayTask.progress}
          sx={{
            bgcolor: '#D3D3D3',
            '& .MuiLinearProgress-bar': { bgcolor: '#5A9CA4' },
            height: 6,
            borderRadius: 5,
            mb: 3,
          }}
        />

        <div className="mt-auto pt-6">
          <Typography variant="subtitle1" className="font-bold mb-3">How to Journal</Typography>
          <ol className="list-decimal pl-5">
            {todayTask.steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-700 mb-1">{step}</li>
            ))}
          </ol>
          <button className="mt-4 w-full bg-[#5A9CA4] text-white py-2 rounded-lg hover:bg-[#5A9CA4]/80">Go To Journal</button>
        </div>
      </Box>
    </Box>
  );
}

export default Dashboard;