import { useState } from "react"
import { CardItemCart } from "../components/CardItemCart"
import { useCartStore } from "../hooks/useCartStore"
import { Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useAuthStore } from "../hooks/useAuthStore"
import { referenceId } from "../api/requestApi"
import queryString from "query-string"
import { getVarEnv } from "../helpers/getVarEnv"

const { VITE_PUBLIC_KEY_MERCADO_PAGO } = getVarEnv()


export const MyCartPage = () => {

  const { isAdmin } = useAuthStore()

  const { cart, startConfirmarCompra } = useCartStore()
  const [confirmCompra, setConfirmCompra] = useState(false)
  const [preferenceId, setPreferenceId] = useState(null)
  const { status } = queryString.parse(location.search)

  const navigate = useNavigate()


  initMercadoPago(VITE_PUBLIC_KEY_MERCADO_PAGO, {
    locale: 'es-AR'
  })

  const idReference = async () => {
    try {
      const result = await referenceId(cart._id)
      if (result.ok)
        setPreferenceId(result.idPreference)
    } catch (error) {
      console.log({ error })
    }
  }

  const confirmarCompra = async () => {
    setConfirmCompra(true)
    await startConfirmarCompra()
    setConfirmCompra(false)
    navigate('/mis-compras')
  }



  if (isAdmin) {
    return (
      <>
        <Typography variant="h4" style={{ marginTop: '45vh', marginLeft: '33vw' }}>El administrador no posee esta función</Typography>
      </>
    )
  }

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
          <div key={product.id._id} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBlock: 30,   // Ocupa todo el alto de la pantalla
            width: '100%'
          }}>
            <CardItemCart  {...product} />
          </div>
        ))
      }
      {
        cart.products.length > 0 &&
        <>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h5"  ><strong>Total: </strong> ${total.toFixed(2)}</Typography>
            {
              !preferenceId &&
              <Button variant="contained" color="primary" onClick={idReference}>
                <Typography sx={{ color: 'white' }}>Confirmar compra</Typography>
              </Button>
            }

            <div style={{ maxWidth: '16%', marginLeft: '42%' }} >
              {
                preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
              }
            </div>
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

      {
        (cart && status == 'approved') && confirmarCompra()
      }
    </>
  )
}
