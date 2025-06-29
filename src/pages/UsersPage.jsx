import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';
import UsersListContainer from '../components/UsersListContainer';
import { Button, Typography, Container, Box } from '@mui/material';
import { BackgroundWithSVG } from '../components/BackgroundWithSVG';

export const UsersPage = () => {
  const { startGetUsers, startDeleteInactive } = useAuthStore();

  const handleDeleteInactive = async () => {
    await startDeleteInactive();
    await startGetUsers();
  };

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <BackgroundWithSVG>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" component="h1" color="white">
            Gestión de Usuarios
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteInactive}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="button" sx={{ color: 'white' }}>
              Eliminar usuarios inactivos
            </Typography>
          </Button>
        </Box>
        <UsersListContainer />
      </Container>
    </BackgroundWithSVG>
  );
};

export default UsersPage;
