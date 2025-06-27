import { useEffect } from 'react'
import { Box } from '@mui/material'
import { CardProducts } from '../components/CardProducts'
import { Carousel } from '../components/Carousel'
import { Footer } from '../components/Footer'
import { useProductStore } from '../hooks/useProductStore'

export const InicioPage = () => {
  const { startGetProducts } = useProductStore()

  useEffect(() => {
    startGetProducts()
  }, [])
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%' 
    }}>
      <Box sx={{ flex: 1 }}>
        <Carousel />
        <CardProducts />
      </Box>
      <Footer />
    </Box>
  )
}
