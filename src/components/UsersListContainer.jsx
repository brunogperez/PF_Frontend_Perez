import { Grid, Box, Typography } from '@mui/material';
import { useAuthStore } from '../hooks/useAuthStore';
import { UserItem } from './UserItem';

export const UsersListContainer = () => {
  const { users } = useAuthStore();

  if (!users || users.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No hay usuarios para mostrar
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        borderRadius: 2,
        p: 3,
        my: 2,
      }}
    >
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
            <UserItem {...user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersListContainer;
