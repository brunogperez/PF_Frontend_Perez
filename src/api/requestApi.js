import ecommerceApi from "./config";

//SESSION

export const loginUser = async (email, password) => {
  try {
    const { data } = await ecommerceApi.post("/session/login", {
      email,
      password,
    });

    const { token, user } = data;
    const { _id, first_name, last_name, role, cart_id } = user;
    localStorage.setItem("token", token);
    return { ok: true, _id, first_name, last_name, role, cart_id };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const registerUser = async (email, password, first_name, last_name) => {
  try {
    const { data } = await ecommerceApi.post("/session/register", {
      email,
      password,
      first_name,
      last_name,
    });
    const { token, user } = data;
    const { _id, role, cart_id } = user;
    localStorage.setItem("token", token);
    return { ok: true, _id, first_name, last_name, role, cart_id };
  } catch (error) {
    return { ok: false, msg: error.response.data.errors[0].msg };
  }
};

export const validarToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { ok: false };
  
  try {
    const { data } = await ecommerceApi.get("/session/renew");
    const { token: newToken, user } = data;
    const { _id, first_name, last_name, role, cart_id } = user;
    
    // Only update token if a new one is provided
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
    
    return { 
      ok: true, 
      _id, 
      first_name, 
      last_name, 
      role, 
      cart_id 
    };
  } catch (error) {
    console.error('Error validating token:', error);
    // Clear invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return { ok: false };
  }
};

export const getUsers = async () => {
  try {
    const { data } = await ecommerceApi.get("/session/users");
    const { users } = data;

    return { ok: true, users };
  } catch (error) {
    return { ok: false };
  }
};

export const sendEmailResetPass = async (email) => {
  try {
    const { data } = await ecommerceApi.post("/session/change-password", {
      email,
      data,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const resetPass = async (password, token) => {
  try {
    const { data } = await ecommerceApi.post("/session/reset-password", {
      password,
      token,
      data,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteUser = async (_id) => {
  try {
    const { data } = await ecommerceApi.post(`/session/delete-user/${_id}`);

    return { ok: true, data };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteInactiveUsers = async () => {
  try {
    const { data } = await ecommerceApi.post(`/session/delete-users`);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
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
      msg: error.response?.data?.msg || 'Error al cambiar el rol' 
    };
  }
};

//PRODUCTS

export const getProducts = async (pageProducts) => {
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

export const getProductbyId = async (id) => {
  try {
    const { data } = await ecommerceApi.get(`/products/${id}`);

    const { product } = data;

    return { ok: true, product: product };
  } catch (error) {
    return { ok: false };
  }
};

export const createProduct = async (producto) => {
  try {
    const { data } = await ecommerceApi.post("/products", producto);
    return { ok: true, producto: data.producto };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteProduct = async (idProduct) => {
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

export const getCartById = async (id) => {
  try {
    const { data } = await ecommerceApi.get(`/carts/${id}`);

    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false };
  }
};

export const addProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.post(
      `/carts/${idCart}/product/${idProduct}`
    );
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const removeProductInCart = async (idCart, idProduct, quantity) => {
  try {
    const { data } = await ecommerceApi.put(
      `/carts/${idCart}/product/${idProduct}`,
      { quantity }
    );
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const deleteProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.delete(
      `/carts/${idCart}/product/${idProduct}`
    );
    return { ok: true, cart: data.cart };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

export const confirmarCompra = async () => {
  try {
    const { data } = await ecommerceApi.get("/session/renew");
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
    const { data } = await ecommerceApi.get("/tickets");
    return { ok: true, tickets: data.tickets };
  } catch (error) {
    return { ok: false };
  }
};

//CHAT

export const getMessages = async () => {
  try {
    const { data } = await ecommerceApi.get("/chat");
    return { ok: true, messages: data.messages };
  } catch (error) {
    return { ok: false };
  }
};

export const createMessage = async (message) => {
  try {
    const { data } = await ecommerceApi.post("/chat", message);
    return { ok: true, message: data.message};
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};

//MERCADO PAGO

export const referenceId = async (idCart) => {
  try {
    const { data } = await ecommerceApi.post(
      `/carts/create-preference/${idCart}`
    );
    
    return { ok: true, idPreference: data.idPreference };
  } catch (error) {
    return { ok: false, msg: error.response.data.msg };
  }
};
