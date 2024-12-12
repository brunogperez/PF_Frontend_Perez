import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'
import UsersListContainer from '../components/UsersListContainer'
import { Button, Typography } from '@mui/material'

export const UsersPage = () => {


  const { startGetUsers, startDeleteInactive } = useAuthStore()

  const onsubmit = async ()=> {
    await startDeleteInactive()
    await startGetUsers()
  }

  useEffect(() => {
    startGetUsers()
  }, [startGetUsers])


  return (
    <>
      <Button variant="contained" color="secondary" style={{ marginLeft: '10%' , marginTop: '10px'}} onClick={() => onsubmit()}>
        <Typography variant="button" sx={{ color: 'white' }}>
          Eliminar usuarios inactivos
        </Typography>
      </Button>
      <UsersListContainer />
    </>
  )
}
