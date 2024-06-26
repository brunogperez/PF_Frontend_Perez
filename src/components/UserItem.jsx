import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuthStore } from '../hooks/useAuthStore';

export const UserItem = ({ _id, first_name, last_name, role}) => {


  const { startDeleteUser } = useAuthStore()

  const onDeleteUser = async() => {
    await startDeleteUser(_id)
  }

  return (
    <Card sx={{ minWidth: '60vh' }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {first_name} {last_name}
        </Typography>
        <Typography variant="body2">
          Rol:{role}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={onDeleteUser} startIcon={<DeleteIcon />}>
          Eliminar usuario
        </Button>
      </CardActions>
    </Card>

  )
}
export default UserItem