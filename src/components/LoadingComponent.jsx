import { CircularProgress, Box } from '@mui/material'

export const LoadingComponent = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'fixed'
    }}>
      <CircularProgress />
    </Box>
  )
}