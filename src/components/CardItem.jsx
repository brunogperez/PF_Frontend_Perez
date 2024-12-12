import { Box, Card,  CardContent,  CardMedia, Chip, Rating, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useProductStore } from '../hooks/useProductStore'


export const CardItem = (product) => {

  const { startProductActivo } = useProductStore()
  const navigate = useNavigate()

  const onClickCard = () => {
    startProductActivo({ ...product });
    navigate(`/product/${product._id}`);
  }

  return (

    <Card sx={{ width: 345, border: '1px solid', borderColor: 'grey.300', borderRadius: '30px', boxShadow: 3, minHeight:400 }} onClick={onClickCard}>
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{ p: 2, borderRadius: '30px' }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="a"
          href="#"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 'bold', mb: 1 }}
        >
          {product.title}
        </Typography>
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Rating value={4.5} readOnly precision={0.5} size="small" />
          <Chip
            label="5.0"
            size="small"
            sx={{ ml: 2, fontWeight: 'bold', bgcolor: 'blue.100', color: 'blue.800' }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="span" fontWeight="bold" color="text.primary">
            $ {product.price}
          </Typography>
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>Ver más</Link>
        </Box>
      </CardContent>
    </Card>

  )
}