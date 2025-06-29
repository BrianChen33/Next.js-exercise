import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UsersTable from '@/app/ui/users/table';
 
export const metadata: Metadata = {
  title: 'Users',
};

export default function Page() {
  return (
    <Box 
    className="flex h-full w-full flex-col items-start justify-start p-4"
    >
      <Typography variant="h5" component="h1" fontWeight={"bold"}>
        Users List
      </Typography>

      <Box 
        sx={{ 
          marginTop: 2,
          width: '100%',
        }}
      >
        <UsersTable />
      </Box>
    </Box>
    

  );
}