import { useState } from "react"
import { CardItemCart } from "../components/CardItemCart"
import { useCartStore } from "../hooks/useCartStore"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import axios from "axios"


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


export const MyCartPage = () => {

  initMercadoPago('TEST-c70dbc8e-1eef-4d28-8a11-eace5826251e', {
    locale: 'es-ar'
  })

  const [preferenceID, setPreferenceID] = useState(null)

  const createPreference = async () => {
    try {

      const response = await axios.post('http://localhost:8080/payment-intent', {
        title: 'items varios',
        price: total,
        quantity: 1,
      })

      const { id } = response.data

      return id
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleBuy = async () => {
    const id = await createPreference()
    if(id){
      setPreferenceID(id)
      /* confirmarCompra() */
    }
  }

  const { cart, startConfirmarCompra } = useCartStore()
  const [confirmCompra, setConfirmCompra] = useState(false)


  if (!cart) {
    return (
      <>

        <Typography variant="h4">Cargando carrito...</Typography>
      </>
    )
  }

  const total = cart?.products?.reduce((accumulator, product) => {
    return accumulator + (product.quantity * product.id.price)
  }, 0)

  const confirmarCompra = async () => {
    console.log('confirmar compra')
    setConfirmCompra(true)
    await startConfirmarCompra()
    setConfirmCompra(false)
  }

  if (confirmCompra) {
    return (
      <>

        <Typography variant="h4">Procesando compra...</Typography>
      </>
    )
  }

  return (
    <>

      {
        cart.products.length > 0 &&
        cart.products.map((product) => (
          <div key={product.id._id}>
            <CardItemCart  {...product} />
          </div>
        ))
      }

      {
        cart.products.length > 0 &&
        <>
          <div className="d-flex justify-content-center mt-3">
            <strong>Total: </strong> ${total.toFixed(2)}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={handleBuy} className="btn btn-primary">Confirmar compra</button>
            {preferenceID && <Wallet initialization={{ preferenceId: preferenceID, redirectMode: 'modal' }} />}
          </div>
        </>
      }

      {
        cart.products.length === 0 &&
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
      }
    </>
  )
}
