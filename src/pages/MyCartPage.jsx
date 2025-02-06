import { useState } from "react"
import { CardItemCart } from "../components/CardItemCart"
import { useCartStore } from "../hooks/useCartStore"
import { Button, MenuItem, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useAuthStore } from "../hooks/useAuthStore"
import { referenceId } from "../api/requestApi"
import queryString from "query-string"
import { getVarEnv } from "../helpers/getVarEnv"
import Swal from "sweetalert2"
import ButtonCustom from "../components/ButtonCustom"
import Select from '@mui/material/Select';
import { Image } from "@mui/icons-material"



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
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Hubo un error al procesar la compra' })
    }
  }


  const confirmarCompra = async () => {
    setConfirmCompra(true)
    await startConfirmarCompra()
    setConfirmCompra(false)
    navigate('/mis-compras')
  }

  const total = cart?.products?.reduce((accumulator, product) => {
    return accumulator + (product.quantity * product.id.price)
  }, 0)


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


  if (confirmCompra) {
    return (
      <>
        <Typography variant="h4">Procesando compra...</Typography>
      </>
    )
  }

  return (

    <main className="container py-8 items-center justify-center">
      <div className="grid lg:grid-cols-4 py-20">
        <div className="lg:col-span-3 items-center justify-center px-40 ">
          <div className="space-y-6 px-20">
            {cart.products.map((product) => (
              <CardItemCart key={product.id}  {...product} />
            ))}
          </div>
        </div>
        <div className=" border-2 rounded-lg border-black p-6 items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping estimate</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax estimate</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Order total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {
              !preferenceId && <ButtonCustom onclick={idReference} text={'Checkout'} />
            }
            <div >
              {
                preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
              }
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

/* <>



  {
    cart.products.length > 0 &&
    cart.products.map((product) => (
      <div key={product.id._id} className="flex justify-center items-center m-10 w-full">
        <CardItemCart  {...product} />
      </div>
    ))

  }
  {
    cart.products.length > 0 &&
    <>


      <div>
        <div className="rounded-lg border p-6 flex flex-col w-full lg:w-1/4">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping estimate</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax estimate</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-medium">
              <span>Order total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {
              !preferenceId &&
              <ButtonCustom className="w-full" size="lg" text={'Checkout'} onclick={idReference} />
            }

          </div>
        </div>
      </div>



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
</> */

export default MyCartPage
