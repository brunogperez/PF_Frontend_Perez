import { useEffect } from 'react'
import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTicketStore } from '../hooks/useTicketStore'
import { useAuthStore } from '../hooks/useAuthStore'
import { LoadingComponent } from '../components/LoadingComponent'

export const MyCompras = () => {

  const { isAdmin } = useAuthStore()

  const { tickets, startGetTickets } = useTicketStore()

  useEffect(() => {
    startGetTickets()
  }, [])

  if (isAdmin) {
    return (
      <>
        <Typography variant="h4" style={{ marginTop: '45vh', marginLeft: '33vw' }}>El administrador no posee esta función</Typography>
      </>
    )
  }

  if (!tickets) {
    return (
      <>
        <Typography variant='h4' style={{ marginTop: '45vh', marginLeft: '33vw' }}>
          <LoadingComponent />
        </Typography>
      </>
    )
  }

  return (
    <>

      {
        tickets.length === 0 &&
        <>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant='h4'>Aun no tienes compras</Typography>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='primary' style={{ marginTop: '20px' }}>
                <Typography variant='button' sx={{ color: 'white' }}>
                  Ir a comprar
                </Typography>
              </Button>
            </Link>
          </div>
        </>
      }

      {
        tickets.length > 0 &&
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '5px' }}>
            <Typography variant='h3' >Historial de Compras</Typography>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket._id} style={{ border: '5px solid #ccc', padding: '20px', marginTop: '20px' }}>
              <Card sx={{ maxWidth: '70%' }} style={{ margin: 'auto'}}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='h5'>Código: {ticket.code}</Typography>
                    <Typography variant='body1'>Fecha de compra: {new Date(ticket.purchase_datetime).toLocaleString()}</Typography>
                    <Typography variant='body1'>Monto total: ${ticket.amount.toFixed(2)}</Typography>
                    <Typography variant='body1'>Correo de compra: {ticket.purchase}</Typography>
                    <Typography variant='h6'>Items:</Typography>
                    {ticket.items.map((item, index) => (
                      <div key={index}>
                        <Typography variant='body2'>{item.title} - Cantidad: {item.quantity} - Precio unitario: ${item.price.toFixed(2)} - Total: ${item.total.toFixed(2)}</Typography>
                      </div>
                    ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}




        </>
      }
    </>
  )
}
