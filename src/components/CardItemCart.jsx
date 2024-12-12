import { Add, Remove, Delete } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'

export const CardItemCart = (product) => {
  const { _id, title, price, stock, thumbnail } = product.id
  const { quantity } = product


  const [cantidad, setCantidad] = useState(quantity)
  const { startAddProductInCart, startRemoveProductInCart, startDeleteProductInCart } = useCartStore()

  const handleAumentarQuantity = () => {
    if (cantidad < stock) {
      setCantidad(prevQuantity => prevQuantity + 1)
      startAddProductInCart(_id)
    }
  }

  const handleDisminuirQuantity = () => {
    if (cantidad > 1) {
      setCantidad(prevQuantity => prevQuantity - 1)
      startRemoveProductInCart(_id)
    }
  }

  const handleDelete = () => startDeleteProductInCart(_id)

  return (

    <Card sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', borderRadius: '12px', width: { xs: 300, md: 600 }, flexDirection: { xs: 'column', md: 'row' } }} >
      <CardMedia
        component="img"
        sx={{ width: 250, objectFit: 'contain', borderRadius: '12px', marginBlock: 2, marginInline: 3 }}
        image={thumbnail}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} >
          <Typography component="div" variant="h5" >
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
            <p className="mb-0">Precio: ${price}</p>
            <p className="mb-0">Total: ${price * cantidad}</p>
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="remove" onClick={handleDisminuirQuantity}><Remove /></IconButton>
          {cantidad}
          <IconButton aria-label="add" onClick={handleAumentarQuantity}><Add /></IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(_id)}><Delete /></IconButton>
        </Box>
      </Box>
    </Card>
  )
}