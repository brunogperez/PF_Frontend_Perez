import { useState, useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { referenceId, clearCart } from '../api/requestApi';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Box, IconButton } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart, Home, Store } from '@mui/icons-material';
import queryString from 'query-string';
import { getVarEnv } from '../helpers/getVarEnv';
import Swal from 'sweetalert2';
import './MyCartPage.css';

const { VITE_PUBLIC_KEY_MERCADO_PAGO } = getVarEnv();

export const MyCartPage = () => {
  const { isAdmin } = useAuthStore();
  const { cart, startConfirmarCompra, startAddProductInCart, startRemoveProductInCart, startDeleteProductInCart, startClearCart } = useCartStore();
  const [preferenceId, setPreferenceId] = useState(null);
  const [quantity, setQuantity] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = queryString.parse(location.search);

  // Handle cart loading and initialization
  useEffect(() => {
    if (!cart) {
      // Initialize cart if not loaded
      const user = useAuthStore().user;
      if (user && user.cart_id) {
        startGetCartById(user.cart_id);
      }
    }
  }, [cart]);

  // Inicializar Mercado Pago
  initMercadoPago(VITE_PUBLIC_KEY_MERCADO_PAGO, { locale: 'es-AR' });

  // Calcular totales
  const subtotal = cart?.products?.reduce((acc, product) => {
    const price = product.id?.price || 0;
    const quantity = product.quantity || 0;
    return acc + (price * quantity);
  }, 0) || 0;

  const shipping = 0; // Podrías calcular el envío aquí si es necesario
  const tax = subtotal * 0.21; // 21% de impuestos (ajustar según corresponda)
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleDeleteProduct = (productId) => {
    startDeleteProductInCart(productId);
  };

  const handleConfirmarCompra = () => {
    startConfirmarCompra();
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción vaciará tu carrito de compras',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const { ok, msg } = await startClearCart();
      if (ok) {
        Swal.fire({
          title: '¡Listo!',
          text: 'El carrito se ha vaciado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: msg || 'No se pudo vaciar el carrito',
          icon: 'error'
        });
      }
    }
  };

  if (!cart) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <Typography variant="h6">Cargando carrito...</Typography>
      </Box>
    );
  }

  if (cart.products?.length === 0) {
    return (
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">Tu carrito está vacío</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => navigate('/productos')}
        >
          Ver productos
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi Carrito
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {cart.products.length} productos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => navigate('/productos')}
        >
          Seguir comprando
        </Button>
      </Box>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product) => (
            <tr key={product.id?._id}>
              <td data-label="Producto">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={product.id?.thumbnail || '/default-product.png'} 
                    alt={product.id?.title || 'Producto'} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '4px' }}
                  />
                  <Typography variant="body1">{product.id?.title || 'Producto no disponible'}</Typography>
                </Box>
              </td>
              <td data-label="Precio">${(product.id?.price || 0).toFixed(2)}</td>
              <td data-label="Cantidad">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(product.id?._id, (quantity[product.id?._id] || 1) - 1)}
                    disabled={quantity[product.id?._id] <= 1}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {quantity[product.id?._id] || 1}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(product.id?._id, (quantity[product.id?._id] || 1) + 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </td>
              <td data-label="Total">${((product.id?.price || 0) * (quantity[product.id?._id] || 1)).toFixed(2)}</td>
              <td data-label="Acciones">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteProduct(product.id?._id)}
                  color="error"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Totales
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Impuestos (21%):</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Envío:</Typography>
          <Typography>${shipping.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 'bold' }}>
          <Typography>Total:</Typography>
          <Typography>${total.toFixed(2)}</Typography>
        </Box>

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handleClearCart}
            startIcon={<Delete />}
          >
            Vaciar carrito
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmarCompra}
            startIcon={<ShoppingCart />}
          >
            Confirmar compra
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MyCartPage;
