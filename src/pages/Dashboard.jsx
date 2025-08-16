import React from 'react';
import { Typography, Paper, Grid, Box, LinearProgress, IconButton, Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for demonstration, from your snippets and image
const userData = {
  name: 'Skylar Dias',
  profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', // Placeholder image
};

const runningTask = {
  total: 100,
  completed: 65,
};

const activityData = [
  { name: 'S', value: 1 },
  { name: 'M', value: 3 },
  { name: 'T', value: 1 },
  { name: 'W', value: 4 },
  { name: 'T', value: 2 },
  { name: 'F', value: 3 },
  { name: 'S', value: 5 },
];

const monthlyMentors = [
  {
    name: 'Curious George',
    role: 'UI UX Design',
    tasks: 40,
    rating: 4.7,
    reviews: 750,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d',
    status: 'Follow',
  },
  {
    name: 'Abraham Lincoln',
    role: '3D Design',
    tasks: 32,
    rating: 4.9,
    reviews: 510,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
    status: 'Followed',
  },
];

const upcomingTasks = [
  {
    title: 'Creating Mobile App Design',
    role: 'UI UX Design',
    progress: 75,
    daysLeft: 3,
    image: 'https://images.unsplash.com/photo-1518770660439-46061ec4bb0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // Placeholder
  },
  {
    title: 'Creating Perfect Website',
    role: 'Web Developer',
    progress: 85,
    daysLeft: 4,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // Placeholder
  },
];

const todayTask = {
  title: 'Creating Awesome Mobile Apps',
  role: 'UI/UX Designer',
  progress: 90,
  time: '1 Hour',
  steps: [
    'Understanding the tools in Figma',
    'Understand the basics of making designs',
    'Design a mobile application with Figma',
  ],
  image: 'https://images.unsplash.com/photo-1632575440628-98e3b56a4b13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // Placeholder
};

const calendarDates = [
  'July 2025',
  [10, 11, 12, 13, 14, 15, 16], // Mock week
];

// const navigationItems = [
//   { label: 'Overview', icon: '⚡' }, // Placeholder icons
//   { label: 'Task', icon: '✅' },
//   { label: 'Mentors', icon: '👤' },
//   { label: 'Message', icon: '✉️' },
//   { label: 'Settings', icon: '⚙️' },
// ];

const achievements = [
  { label: 'First Week Streak', unlocked: true },
  { label: '10 Happy Entries', unlocked: false },
  { label: 'Night Owl Journaler', unlocked: false },
];


function Dashboard() {
  return (
    <Box className="flex bg-[#F8F9FA] min-h-screen">
      {/* Left Sidebar */}
      {/* <Box className="w-[200px] bg-white p-4 flex flex-col items-center border-r border-gray-200"> */}
        {/* <Typography variant="h6" className="font-bold mb-8 text-[#5A9CA4]">Nuegas</Typography> */}
        {/* <div className="flex flex-col space-y-4 w-full">
          {navigationItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-600 hover:text-[#5A9CA4] cursor-pointer p-2 rounded transition-colors duration-200">
              <span className="text-xl">{item.icon}</span>
              <Typography variant="body1">{item.label}</Typography>
            </div>
          ))}
        </div> */}
        {/* Help Center */}
        {/* <div className="mt-auto bg-[#22223B] text-white p-4 rounded-lg w-full">
          <Typography variant="h6" className="text-sm">Help Center</Typography>
          <Typography variant="body2" className="text-xs mt-1">Having trouble in Learning? Please contact us for more questions.</Typography>
          <button className="mt-3 text-sm px-3 py-1 rounded-full border border-white">Go To Help Center</button>
        </div>
      </Box> */}

      {/* Main Content */}
      <Box className="flex-1 p-8">
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-[#22223B]">
            Hi, {userData.name}
            <div className="text-sm font-normal text-gray-500">Let's finish your task today!</div>
          </Typography>
          <Box className="flex items-center space-x-4">
            <IconButton><img src="https://i.pravatar.cc/40?u=skylar" alt="Profile" className="rounded-full w-10 h-10" /></IconButton>
          </Box>
        </Box>

        {/* Top Panels */}
        <Grid container spacing={4} className="mb-6">
          {/* Running Task */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="p-4 bg-[#22223B] text-white rounded-lg h-full">
              <Typography variant="h6" className="text-sm">Running Task</Typography>
              <div className="flex items-center mt-2">
                <Typography variant="h3" className="font-bold">{runningTask.completed}</Typography>
                <div className="ml-2">
                  <Typography variant="h6" className="font-bold text-gray-400">{runningTask.total}</Typography>
                  <Typography variant="body2" className="text-gray-400">Task</Typography>
                </div>
              </div>
              <LinearProgress
                variant="determinate"
                value={(runningTask.completed / runningTask.total) * 100}
                sx={{
                  bgcolor: '#5A9CA4',
                  '& .MuiLinearProgress-bar': { bgcolor: '#F7C873' },
                  height: 8,
                  borderRadius: 5,
                  mt: 2,
                }}
              />
            </Paper>
          </Grid>
          {/* Activity Chart */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper className="p-4 rounded-lg h-full">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h6" className="text-sm">Activity</Typography>
                <div className="flex items-center space-x-2">
                  <Typography variant="body2" className="text-gray-500">This Week</Typography>
                  <ArrowBackIosNewIcon sx={{ fontSize: 10, color: 'gray' }} />
                  <ArrowForwardIosIcon sx={{ fontSize: 10, color: 'gray' }} />
                </div>
              </div>
              <div className="w-full h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#5A9CA4"
                      strokeWidth={2}
                      dot={{ fill: '#F7C873', stroke: '#5A9CA4', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Grid>
          {/* Calendar */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 rounded-lg h-full">
              <div className="flex justify-between items-center mb-2">
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
              <Grid container spacing={1} className="mt-1">
                {calendarDates[1].map((date, index) => (
                  <Grid item xs={1.7} key={index} className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${date === 16 ? 'bg-[#5A9CA4] text-white' : 'hover:bg-gray-100'
                        }`}
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
          {/* Monthly Mentors */}
          <Grid item xs={12} md={8}>
            <Paper className="p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-sm">Monthly Mentors</Typography>
                <div className="flex items-center space-x-2">
                  <IconButton size="small"><ArrowBackIosNewIcon sx={{ fontSize: 14 }} /></IconButton>
                  <IconButton size="small"><ArrowForwardIosIcon sx={{ fontSize: 14 }} /></IconButton>
                </div>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {monthlyMentors.map((mentor, index) => (
                  <Paper key={index} className="flex-none p-4 w-48 bg-[#F7F7F7] rounded-lg">
                    <div className="flex items-center justify-center">
                      <Avatar src={mentor.avatar} alt={mentor.name} className="w-12 h-12" />
                    </div>
                    <div className="text-center mt-2">
                      <Typography variant="subtitle1" className="font-bold text-sm">{mentor.name}</Typography>
                      <Typography variant="body2" className="text-gray-500 text-xs">{mentor.role}</Typography>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <Typography variant="body2">{mentor.tasks} Task</Typography>
                      <Typography variant="body2">{mentor.rating} ({mentor.reviews} Reviews)</Typography>
                    </div>
                    <button className="mt-3 w-full text-sm px-3 py-1 rounded-full border border-gray-400 hover:bg-gray-200">
                      {mentor.status}
                    </button>
                  </Paper>
                ))}
              </div>
            </Paper>
          </Grid>
          {/* Task Today */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h6" className="text-sm">Task Today</Typography>
                <MoreHorizIcon sx={{ color: 'gray' }} />
              </div>
              <div className="relative">
                <img src={todayTask.image} alt="Task" className="w-full h-32 object-cover rounded-lg" />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {/* Mock tags */}
                  <span className="bg-white/80 text-xs px-2 py-1 rounded-lg">Design</span>
                  <span className="bg-white/80 text-xs px-2 py-1 rounded-lg">UI/UX</span>
                </div>
              </div>
              <Typography variant="subtitle1" className="font-bold mt-2">{todayTask.title}</Typography>
              <Typography variant="body2" className="text-gray-500 text-sm mb-2">{todayTask.role}</Typography>
              <div className="flex items-center justify-between">
                <Typography variant="body2" className="text-sm">Progress</Typography>
                <Typography variant="body2" className="font-bold text-sm text-[#5A9CA4]">{todayTask.progress}%</Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={todayTask.progress}
                sx={{
                  bgcolor: '#e0e0e0',
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
                {/* Mock user avatars */}
                <div className="flex -space-x-2">
                  <Avatar src="https://i.pravatar.cc/40?u=user1" sx={{ width: 24, height: 24, border: '2px solid white' }} />
                  <Avatar src="https://i.pravatar.cc/40?u=user2" sx={{ width: 24, height: 24, border: '2px solid white' }} />
                  <Avatar src="https://i.pravatar.cc/40?u=user3" sx={{ width: 24, height: 24, border: '2px solid white' }} />
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Upcoming Tasks Section */}
        <Box>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="text-sm">Upcoming Task</Typography>
            <div className="flex items-center space-x-2">
              <IconButton size="small"><ArrowBackIosNewIcon sx={{ fontSize: 14 }} /></IconButton>
              <IconButton size="small"><ArrowForwardIosIcon sx={{ fontSize: 14 }} /></IconButton>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {upcomingTasks.map((task, index) => (
              <Paper key={index} className="flex-none p-4 w-64 rounded-lg">
                <img src={task.image} alt={task.title} className="w-full h-24 object-cover rounded-lg" />
                <Typography variant="subtitle1" className="font-bold mt-2">{task.title}</Typography>
                <Typography variant="body2" className="text-gray-500 text-sm">{task.role}</Typography>
                <div className="flex items-center justify-between mt-2">
                  <Typography variant="body2" className="text-sm">Progress</Typography>
                  <Typography variant="body2" className="font-bold text-sm text-[#5A9CA4]">{task.progress}%</Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={task.progress}
                  sx={{
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': { bgcolor: '#5A9CA4' },
                    height: 6,
                    borderRadius: 5,
                    mt: 1,
                  }}
                />
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <CalendarTodayIcon sx={{ fontSize: 14 }} />
                  <Typography variant="body2" className="ml-1">{task.daysLeft} Days Left</Typography>
                </div>
              </Paper>
            ))}
          </div>
        </Box>
      </Box>

      {/* Right Sidebar (Task Today Details) */}
      <Box className="w-[300px] bg-white p-4 flex flex-col border-l border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="text-sm">Task Today</Typography>
          <MoreHorizIcon sx={{ color: 'gray' }} />
        </div>
        <div className="relative mb-4">
          <img src={todayTask.image} alt="Task" className="w-full h-32 object-cover rounded-lg" />
          <div className="absolute top-2 right-2 flex space-x-1">
            <span className="bg-white/80 text-xs px-2 py-1 rounded-lg">Design</span>
            <span className="bg-white/80 text-xs px-2 py-1 rounded-lg">UI/UX</span>
          </div>
        </div>
        <Typography variant="h6" className="font-bold">{todayTask.title}</Typography>
        <Typography variant="body2" className="text-gray-500 mb-2">{todayTask.role}</Typography>

        <div className="flex items-center justify-between mb-4">
          <Typography variant="body2">Progress</Typography>
          <Typography variant="body2" className="font-bold text-[#5A9CA4]">{todayTask.progress}%</Typography>
        </div>
        <LinearProgress
          variant="determinate"
          value={todayTask.progress}
          sx={{
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': { bgcolor: '#5A9CA4' },
            height: 6,
            borderRadius: 5,
            mb: 2,
          }}
        />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="body2">{todayTask.time}</Typography>
          </div>
          <div className="flex -space-x-2">
            <Avatar src="https://i.pravatar.cc/40?u=user1" sx={{ width: 24, height: 24, border: '2px solid white' }} />
            <Avatar src="https://i.pravatar.cc/40?u=user2" sx={{ width: 24, height: 24, border: '2px solid white' }} />
            <Avatar src="https://i.pravatar.cc/40?u=user3" sx={{ width: 24, height: 24, border: '2px solid white' }} />
          </div>
        </div>

        <div className="mt-auto">
          <Typography variant="subtitle1" className="font-bold mb-2">Detail Task</Typography>
          <ol className="list-decimal pl-5">
            {todayTask.steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-700 mb-1">{step}</li>
            ))}
          </ol>
          <button className="mt-4 w-full bg-[#5A9CA4] text-white py-2 rounded-lg hover:bg-[#5A9CA4]/80">Go To Detail</button>
        </div>
      </Box>
    </Box>
  );
}

export default Dashboard;