import { useAuthStore } from '../hooks/useAuthStore';
import { Box, CardContent, Typography, Button, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserItem = ({ _id, first_name, last_name, role }) => {

  const { startDeleteUser } = useAuthStore()

  const onDeleteUser = async () => {
    await startDeleteUser(_id)
  }

  return (
    <Card sx={{ minWidth: 345, borderRadius: '30px', padding: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flexDirection: 'row' }}>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {first_name} {last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rol:{role}
          </Typography>
        </Box>
        <Box>
          <Button onClick={onDeleteUser} sx={{ alignContent: 'center' }} >
            <DeleteIcon color='red' />
          </Button>
        </Box>
      </CardContent>

    </Card>

  )
}
export default UserItem