import { Grid } from '@mui/material'
import { useAuthStore } from '../hooks/useAuthStore'
import { UserItem } from './UserItem'

export const UsersListContainer = () => {

  const { users } = useAuthStore()



  return (
    <Grid container spacing={0} alignItems='center' justifyContent='center'>
      {users.map((user) => (
        <Grid key={user._id} item xs={6} sx={{ margin: 1, padding: 1 }}>
          <UserItem {...user} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UsersListContainer