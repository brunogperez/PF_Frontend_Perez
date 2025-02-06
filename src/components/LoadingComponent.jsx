import { CircularProgress } from '@mui/material'

export const LoadingComponent = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen fixed'>
      <CircularProgress />
    </div>
  )
}