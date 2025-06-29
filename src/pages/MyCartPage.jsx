import { useState } from 'react';
import { CardItemCart } from '../components/CardItemCart';
import { useCartStore } from '../hooks/useCartStore';
import { Button, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useAuthStore } from '../hooks/useAuthStore';
import { referenceId } from '../api/requestApi';
import queryString from 'query-string';
import { getVarEnv } from '../helpers/getVarEnv';
import Swal from 'sweetalert2';
import ButtonCustom from '../components/ButtonCustom';
import Select from '@mui/material/Select';
import { Image } from '@mui/icons-material';
import './MyCartPage.css';

const { VITE_PUBLIC_KEY_MERCADO_PAGO } = getVarEnv();

export const MyCartPage = () => {
  const { isAdmin } = useAuthStore();

  const { cart, startConfirmarCompra } = useCartStore();
  const [confirmCompra, setConfirmCompra] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const { status } = queryString.parse(location.search);

  const navigate = useNavigate();

  initMercadoPago(VITE_PUBLIC_KEY_MERCADO_PAGO, {
    locale: 'es-AR',
  });

  const idReference = async () => {
    try {
      const result = await referenceId(cart._id);
      if (result.ok) setPreferenceId(result.idPreference);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Hubo un error al procesar la compra' });
    }
  };

  const confirmarCompra = async () => {
    setConfirmCompra(true);
    await startConfirmarCompra();
    setConfirmCompra(false);
    navigate('/mis-compras');
  };

  const total = cart?.products?.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.id.price;
  }, 0);

  if (isAdmin) {
    return (
      <div className="admin-message">
        <Typography variant="h4">El administrador no posee esta función</Typography>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="loading-message">
        <Typography variant="h4">Cargando carrito...</Typography>
      </div>
    );
  }

  if (cart.products.length === 0) {
    return (
      <div className="empty-cart-message">
        <Typography variant="h4">Tu carrito está vacío</Typography>
        <Typography variant="body1" className="empty-cart-text">
          ¡Agrega algunos productos para comenzar!
        </Typography>
        <Link to="/" className="empty-cart-link">
          <Button variant="contained" color="primary" className="empty-cart-button">
            <Typography variant="button" sx={{ color: 'white' }}>
              Ir a comprar
            </Typography>
          </Button>
        </Link>
      </div>
    );
  }

  if (confirmCompra) {
    return (
      <div className="loading-message">
        <Typography variant="h4">Procesando compra...</Typography>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          {cart.products.map(product => (
            <CardItemCart key={product.id} {...product} />
          ))}
        </div>

        <div className="order-summary">
          <h2>Resumen del pedido</h2>
          <div className="order-details">
            <div className="order-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Envío</span>
              <span>${(0).toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Impuestos</span>
              <span>${(0).toFixed(2)}</span>
            </div>
            <div className="order-row order-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {!preferenceId && (
              <ButtonCustom className="checkout-button" onClick={idReference} text={'Pagar'} />
            )}

            {preferenceId && (
              <div className="wallet-container">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartPage;
