import { useAuthStore } from '../hooks/useAuthStore';
import { Box, CardContent, Typography, Button, Card, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserItem = ({_id, first_name, last_name, role, email}) => {

  const { startDeleteUser, startSwitchRole } = useAuthStore()

  const onDeleteUser = async () => {
    await startDeleteUser(_id)
  }
  
  const onSwitchRole = async (newRole) => {
    // Si el rol actual es el mismo que el nuevo, lo cambiamos a 'user'
    const roleToSet = role === newRole ? 'user' : newRole;
    await startSwitchRole(_id, roleToSet);
  }

  return (
    <Card sx={{ minWidth: 345, borderRadius: '30px', padding: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flexDirection: 'row' }}>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {first_name} {last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rol: {role}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email: {email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button onClick={onDeleteUser} sx={{ alignSelf: 'flex-end' }}>
            <DeleteIcon color='error' />
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={role === 'admin'}
                onChange={() => onSwitchRole('admin')}
                color="primary"
                onClick={(e) => e.stopPropagation()}
              />
            }
            label="Admin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={role === 'premium'}
                onChange={() => onSwitchRole('premium')}
                color="secondary"
                onClick={(e) => e.stopPropagation()}
              />
            }
            label="Premium"
          />
          
        </Box>
      </CardContent>

    </Card>

  )
}
export default UserItem