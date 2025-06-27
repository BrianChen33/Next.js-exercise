import SideNav from '@/app/ui/dashboard/sidenav';
import Box from '@mui/material/Box';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto',
          transition: 'margin-left 0.3s',
          marginTop: '64px', // Adjust for AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
}