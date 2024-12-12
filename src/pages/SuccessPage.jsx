import { useEffect, useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'


export const SuccessPage = () => {

  const { } = useAuthStore()
  const {cart, startConfirmarCompra, startGetCartById } = useCartStore()

  useEffect(() => {
    startGetCartById()
    console.log(cart)
  }, [])



  const [confirmCompra, setConfirmCompra] = useState(true)

  const confirmarCompra = async () => {
    console.log('confirmar compra')
    setConfirmCompra(true)
    await startConfirmarCompra()
    setConfirmCompra(false)
  }


/*   if(startGetCartById) confirmarCompra() */

  if (confirmCompra) {
    return (
      <>
        <Typography variant="h4">Procesando compra</Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.location.reload()}>
              <Typography variant="button" sx={{ color: 'white' }}>
                Volver al inicio
              </Typography>
            </Button>
          </Link>
      </>
    )
  } else {
    return (
      <>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h4">Tu carrito está vacío</Typography>
          <Typography variant="body1" style={{ marginTop: '20px', marginBottom: '20px' }}>¡Agrega algunos productos para comenzar!</Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
              <Typography variant="button" sx={{ color: 'white' }}>
                Ir a comprar
              </Typography>
            </Button>
          </Link>
        </div>
      </>
    )
  }

}

