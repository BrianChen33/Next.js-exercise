'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" component="h1" mb={1} align="center" fontWeight={"bold"}>
          Welcome back!
        </Typography>
        <Typography variant="h6" component="h2" mb={1} align="center">
          Please log in to continue
        </Typography>
        <TextField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          fullWidth
          size="small"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          required
          fullWidth
          size="small"
          inputProps={{ minLength: 6 }}
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <FormControlLabel 
          control={<Checkbox name="rememberMe" defaultChecked={false}/>}  //功能还没设置上
          label="Remember me" 
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPending}
          sx={{ mt: 1 }}
        >
          Log in
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
      
    </form>
  );
}