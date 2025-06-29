import { useDispatch, useSelector } from 'react-redux';
import {
  addProductInCart,
  confirmarCompra,
  deleteProductInCart,
  getCartById,
  removeProductInCart,
  clearCart,
} from '../api/requestApi';
import Swal from 'sweetalert2';
import { onCart } from '../store/cartSlice';
import { useState, useEffect } from 'react';

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user outside of useEffect to avoid hook rules violation
  const user = useSelector(state => state.auth);

  useEffect(() => {
    // Initialize cart when user logs in
    const initializeCart = async () => {
      try {
        setLoading(true);
        setError(null);
        if (user && user.cart_id) {
          const resp = await getCartById(user.cart_id);
          if (resp.ok) {
            dispatch(onCart(resp.cart));
          } else {
            setError('No se pudo cargar el carrito');
          }
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
        setError('Error al cargar el carrito');
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [dispatch, user]);

  const startGetCartById = async id => {
    if (!id) {
      console.log('No cart ID provided, cannot fetch cart');
      return { ok: false };
    }
    try {
      setLoading(true);
      setError(null);
      const resp = await getCartById(id);
      if (resp.ok) {
        dispatch(onCart(resp.cart));
        return { ok: true };
      }
      return { ok: false, msg: 'Error al obtener el carrito' };
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Error al conectar con el servidor');
      return { ok: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  const startAddProductInCart = async idProduct => {
    if (!cart || !cart._id) {
      console.error('No cart available. Please log in again.');
      return Swal.fire({
        title: 'Error',
        text: 'No se pudo acceder al carrito. Por favor, inicia sesión nuevamente.',
        icon: 'error',
      });
    }

    try {
      const resp = await addProductInCart(cart._id, idProduct);

      if (resp.ok) {
        dispatch(onCart(resp.cart));
        return { ok: true };
      }
      
      return Swal.fire({
        title: 'Error',
        text: resp.msg || 'No se pudo agregar el producto al carrito',
        icon: 'error',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return Swal.fire({
        title: 'Error',
        text: 'Error al conectar con el servidor',
        icon: 'error',
      });
    }
  };

  const startRemoveProductInCart = async idProduct => {
    const p = cart.products.find(p => p.id._id == idProduct);
    const quantity = p.quantity - 1;
    const resp = await removeProductInCart(cart._id, idProduct, quantity);

    if (resp.ok) {
      dispatch(onCart(resp.cart));
      return;
    }
    return Swal.fire({
      title: 'Ocurrió un error al obtener los productos',
      html: 'Por favor, intenta nuevamente',
      icon: 'error',
    });
  };

  const startDeleteProductInCart = async idProduct => {
    const resp = await deleteProductInCart(cart._id, idProduct);
    if (resp.ok) {
      dispatch(onCart(resp.cart));
      return;
    }
    return Swal.fire({
      title: 'Ocurrió un error al obtener los productos',
      html: 'Por favor, intenta nuevamente',
      icon: 'error',
    });
  };

  const startConfirmarCompra = async () => {
    const resp = await confirmarCompra();
    if (resp.ok) {
      startGetCartById(cart._id);
      return;
    }
    return Swal.fire({
      title: 'Ocurrió un error al obtener los productos',
      html: 'Por favor, intenta nuevamente',
      icon: 'error',
    });
  };

  const startClearCart = async () => {
    try {
      const resp = await clearCart(cart._id);
      if (resp.ok) {
        dispatch(onCart(resp.cart));
        return { ok: true };
      }
      throw new Error(resp.msg || 'Error al vaciar el carrito');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(error.message);
      return { ok: false, msg: error.message };
    }
  };

  return {
    cart,
    startGetCartById,
    startAddProductInCart,
    startRemoveProductInCart,
    startDeleteProductInCart,
    startConfirmarCompra,
    startClearCart,
  };
};
