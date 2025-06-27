import { useEffect } from 'react'
import { Box } from '@mui/material'
import { CardProducts } from '../components/CardProducts'
import { Carousel } from '../components/Carousel'
import { Footer } from '../components/Footer'
import { useProductStore } from '../hooks/useProductStore'
import geometricBg from '../assets/backgrounds/geometric-bg.svg'

export const InicioPage = () => {
  const { startGetProducts } = useProductStore();

  useEffect(() => {
    startGetProducts();
  }, []);
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      backgroundColor: '#000'
    }}>
      {/* Fondo SVG */}
      <Box 
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${geometricBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          opacity: 0.9
        }}
      />
      
      {/* Contenido */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Carousel />
          <CardProducts />
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}
