import { Typography, Box, Button, Avatar, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationsChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  return (
    <div className="p-8 w-full max-w-xl mx-auto flex flex-col items-center" style={{ background: '#F6F8F9' }}>
      <Avatar
        alt="Skylar Dias"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <Typography variant="h4" className="mb-1" style={{ color: '#22223B' }}>Skylar Dias</Typography>
      <Typography variant="body1" className="mb-6" style={{ color: '#5A9CA4' }}>
        View and edit your personal information and preferences.
      </Typography>

      <Box className="w-full">
        <Typography variant="subtitle1" className="mb-2 font-bold" style={{ color: '#22223B' }}>User Information</Typography>
        <Typography variant="body2" className="mb-4" style={{ color: '#5A9CA4' }}>
          Email: skylar.dias@example.com<br />
          Account created: August 16, 2025
        </Typography>
      </Box>

      <Box className="w-full mt-4">
        <Typography variant="subtitle1" className="mb-2 font-bold" style={{ color: '#22223B' }}>Account Settings</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#22223B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#5A9CA4',
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Box className="w-full mt-6">
        <Typography variant="subtitle1" className="mb-2 font-bold" style={{ color: '#22223B' }}>Settings</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsChange}
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: '#D3D3D3',
                },
                '& .Mui-checked .MuiSwitch-thumb': {
                  backgroundColor: '#5A9CA4',
                },
              }}
            />
          }
          label="Enable Notifications"
        />
      </Box>
    </div>
  );
}