import { Typography, Paper } from '@mui/material'

export default function Profile() {
  return (
    <Paper elevation={3} className="p-8 w-full max-w-xl mx-auto bg-[#F6F8F9]">
      <Typography variant="h4" className="text-[#5A9CA4] mb-4">Profile</Typography>
      <Typography variant="body1" className="text-[#22223B]">
        View and edit your personal information and preferences.
      </Typography>
    </Paper>
  )
}
