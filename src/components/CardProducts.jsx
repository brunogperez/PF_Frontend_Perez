import { Box, Button, Grid } from '@mui/material'
import { useProductStore } from '../hooks/useProductStore'
import { CardItem } from './CardItem'
import { useEffect, useState } from 'react'

export const CardProducts = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const { products, pagination, startGetProducts } = useProductStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    startGetProducts(currentPage).then(() => setLoading(false))
  }, [currentPage])

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Grid container spacing={3} alignItems='center' justifyContent='center' sx={{ paddingX: 20, paddingTop: 3 }}>
        {
          products?.map(producto => (
            <Grid key={producto._id} item xs={12} sm={6} md={3}>
              <CardItem  {...producto} />
            </Grid>
          ))
        }

      </Grid>


      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
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
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        )}
      </Box>

    </>
  )
}

