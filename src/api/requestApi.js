import ecommerceApi from './config';

//SESSION

export const loginUser = async (email, password) => {
  try {
    const { data } = await ecommerceApi.post('/session/login', {
      email,
      password,
    });

    const { token, user } = data;

    if (!token) {
      return { ok: false, msg: 'No se recibió token de autenticación' };
    }

    localStorage.setItem('token', token);
    const { _id, first_name, last_name, role, cart_id } = user;

    return {
      ok: true,
      _id,
      first_name,
      last_name,
      role,
      cart_id,
      token,
    };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al iniciar sesión',
      status: error.response?.status,
    };
  }
};

export const registerUser = async (email, password, first_name, last_name) => {
  try {
    const { data } = await ecommerceApi.post('/session/register', {
      email,
      password,
      first_name,
      last_name,
    });
    const { token, user } = data;
    const { _id, role, cart_id } = user;
    localStorage.setItem('token', token);
    return { ok: true, _id, first_name, last_name, role, cart_id };
  } catch (error) {
    console.error('Error en registerUser:', error);

    // Manejar diferentes formatos de respuesta de error
    let errorMessage = 'Error al registrar el usuario';

    if (error.response) {
      // El servidor respondió con un estado de error
      if (
        error.response.data &&
        error.response.data.errors &&
        Array.isArray(error.response.data.errors) &&
        error.response.data.errors.length > 0
      ) {
        // Formato: { errors: [{ msg: 'mensaje de error' }] }
        errorMessage = error.response.data.errors[0].msg;
      } else if (error.response.data && error.response.data.message) {
        // Formato: { message: 'mensaje de error' }
        errorMessage = error.response.data.message;
      } else if (error.response.data && error.response.data.msg) {
        // Formato: { msg: 'mensaje de error' }
        errorMessage = error.response.data.msg;
      } else if (error.response.status === 400) {
        errorMessage = 'Datos de registro inválidos';
      } else if (error.response.status === 409) {
        errorMessage = 'El correo electrónico ya está en uso';
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No se pudo conectar con el servidor';
    }

    return { ok: false, msg: errorMessage };
  }
};

export const validarToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found in localStorage');
    return { ok: false, error: 'No token found' };
  }

  try {
    console.log('Attempting to validate token...');
    const { data } = await ecommerceApi.get('/session/renew');

    if (!data || !data.user) {
      console.error('Invalid response format from server:', data);
      return { ok: false, error: 'Invalid server response' };
    }

    const { token: newToken, user } = data;
    const { _id, first_name, last_name, role, cart_id } = user;

    // Only update token if a new one is provided
    if (newToken) {
      localStorage.setItem('token', newToken);
      console.log('Token refreshed successfully');
    }

    return {
      ok: true,
      _id,
      first_name,
      last_name,
      role,
      cart_id,
    };
  } catch (error) {
    console.error('Error validating token:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });

    // Clear token on any error
    localStorage.removeItem('token');

    return {
      ok: false,
      error: error.response?.data?.message || 'Error de autenticación',
      status: error.response?.status,
    };
  }
};

export const getUsers = async () => {
  try {
    const { data } = await ecommerceApi.get('/session/users');
    const { users } = data;

    return { ok: true, users };
  } catch (error) {
    return { ok: false };
  }
};

export const sendEmailResetPass = async email => {
  try {
    await ecommerceApi.post('/session/forgot-password', { email });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al enviar el correo de recuperación',
    };
  }
};

export const resetPass = async (password, token) => {
  try {
    await ecommerceApi.post('/session/reset-password', {
      password,
      token,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al restablecer la contraseña',
    };
  }
};

export const deleteUser = async _id => {
  try {
    const response = await ecommerceApi.delete(`/session/user/${_id}`);

    return {
      ok: true,
      data: response.data,
      msg: response.data?.msg || 'Usuario eliminado correctamente',
    };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status,
      data: error.response?.data,
      msg:
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'Error al eliminar el usuario. Por favor, intente nuevamente.',
    };
  }
};

export const deleteInactiveUsers = async () => {
  try {
    const { data } = await ecommerceApi.delete('/session/inactive-users');
    return { ok: true, data };
  } catch (error) {
    console.error('Error deleting inactive users:', error);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al eliminar usuarios inactivos',
    };
  }
};

export const switchRole = async (_id, newRole) => {
  try {
    const { data } = await ecommerceApi.put(`/session/switchRole/${_id}`, { role: newRole });
    return { ok: true, data };
  } catch (error) {
    console.error('Error en switchRole:', error);
    return {
      ok: false,
      msg: error.response?.data?.msg || 'Error al cambiar el rol',
    };
  }
};

//PRODUCTS

export const getProducts = async pageProducts => {
  try {
    const { data } = await ecommerceApi.get(`/products?page=${pageProducts}`);

    const { result } = data;
    const {
      payload: products,
      totalDocs,
      totalPages,
      limit,
      query,
      page,
      hasNextPage,
      hasPrevPage,
      prevPage,
      nextPage,
    } = result;

    return {
      ok: true,
      products,
      pagination: {
        totalDocs,
        totalPages,
        limit,
        query,
        page,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
      },
    };
  } catch (error) {
    return { ok: false };
  }
};

export const getProductbyId = async id => {
  try {
    const { data } = await ecommerceApi.get(`/products/${id}`);

    const { product } = data;

    return { ok: true, product: product };
  } catch (error) {
    return { ok: false };
  }
};

export const createProduct = async producto => {
  try {
    const { data } = await ecommerceApi.post('/products', producto);
    return { ok: true, producto: data.producto };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteProduct = async idProduct => {
  try {
    const { data } = await ecommerceApi.delete(`/products/${idProduct}`);
    return { ok: true, msg: data.msg };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const updateProduct = async (id, values) => {
  try {
    const { data } = await ecommerceApi.put(`/products/${id}`, values);
    return { ok: true, producto: data.producto };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

//CARTS

export const getCartById = async id => {
  try {
    const { data } = await ecommerceApi.get(`/carts/${id}`);

    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false };
  }
};

export const addProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.post(`/carts/${idCart}/product/${idProduct}`);
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const removeProductInCart = async (idCart, idProduct, quantity) => {
  try {
    const { data } = await ecommerceApi.put(`/carts/${idCart}/product/${idProduct}`, { quantity });
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.delete(`/carts/${idCart}/product/${idProduct}`);
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const clearCart = async idCart => {
  try {
    const { data } = await ecommerceApi.delete(`/carts/${idCart}`);
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response?.data?.msg || 'Error al vaciar el carrito' };
  }
};

export const confirmarCompra = async () => {
  try {
    const { data } = await ecommerceApi.get('/session/renew');
    const { user } = data;
    const { cart_id } = user;
    const { result } = await ecommerceApi.post(`/carts/${cart_id}/purchase`);
    return { ok: true, result };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

// TICKETS

export const getTickets = async () => {
  try {
    const { data } = await ecommerceApi.get('/tickets');
    return { ok: true, tickets: data.tickets };
  } catch (error) {
    return { ok: false };
  }
};

//CHAT

export const getMessages = async () => {
  try {
    const { data } = await ecommerceApi.get('/chat');
    return { ok: true, messages: data.messages };
  } catch (error) {
    return { ok: false };
  }
};

export const createMessage = async message => {
  try {
    const { data } = await ecommerceApi.post('/chat', message);
    return { ok: true, message: data.message };
  } catch (error) {
    return { ok: false, msg: error.response?.data?.msg || 'Error al crear mensaje' };
  }
};

//MERCADO PAGO

export const referenceId = async idCart => {
  try {
    const { data } = await ecommerceApi.post(`/carts/create-preference/${idCart}`);

    return { ok: true, idPreference: data.idPreference };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};
