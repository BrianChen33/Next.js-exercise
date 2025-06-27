import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            bgcolor: 'primary.main',
            borderRadius: 2,
            p: 2,
            mb: 2,
            height: 80,
            color: 'white',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '140' }}>
            <AcmeLogo />
          </Box>
        </Box>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Suspense>
          <LoginForm />
        </Suspense>
      </Paper>
    </Box>
  );
}