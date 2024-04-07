import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
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
    <Card sx={{ maxWidth: 300, minHeight: 400, boxShadow: 1, borderRadius: 2 }} onClick={onClickCard}>
      <CardHeader />
      <CardMedia
        component='img'
        height='200'
        image={product.thumbnail}
        alt={product.title}
        style={{ objectFit: 'contain', borderRadius: '20px' }}
      />

      <CardContent>
        <Typography variant='h6'>{product.title}</Typography>
        <Typography variant='body2' color='text.secondary'>{product.description}</Typography>
        <Typography variant='body2' color='text.secondary'>Precio: ${product.price}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Typography><Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Ver más</Link></Typography>
      </CardActions>
    </Card>
  )
}