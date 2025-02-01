import { Box, Button, Grid } from '@mui/material'
import { useProductStore } from '../hooks/useProductStore'
import { CardItem } from './CardItem'
import { useEffect, useState } from 'react'
import { LoadingComponent } from './LoadingComponent'
import { Carousel } from '../components/Carousel.jsx'
import { Footer } from '../components/Footer.jsx'


export const CardProducts = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const { products, pagination, startGetProducts } = useProductStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    startGetProducts(currentPage)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [currentPage])



  const goToPage = (page) => {
    setCurrentPage(page)
    setLoading(false)
  }


  if (loading)
    return <LoadingComponent />


  return (

    <>
      <Carousel />
      <Grid container spacing={5} alignItems='center' justifyContent='center' sx={{ paddingX: 20, paddingTop: 1, marginBlock: 1 }}>
        {
          products?.map(product => (
            <Grid key={product._id} item xs={12} md={6} lg={3} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBlock: 2,
              width: '100%'
            }} >
              <CardItem  {...product} />
            </Grid>
          ))
        }
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        {pagination && (
          <Box>
            {Array.from({ length: pagination.totalPages }).map((_, index) => (
              <Button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                sx={{
                  fontWeight: 'bold',
                  margin: '0 5px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        )}
      </Box>
      <Footer />
    </>
  )
}


