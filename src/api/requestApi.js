
import ecommerceApi from './config'


//SESSION

export const loginUser = async (email, password) => {
  try {
    const { data } = await ecommerceApi.post('/session/login', { email, password })
    console.log(data)
    const { token, user } = data
    const { _id, first_name, last_name, role, cart_id } = user
    localStorage.setItem('token', token)
    return { ok: true, _id, first_name, last_name, role, cart_id }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.msg }
  }
}

export const registerUser = async (email, password, first_name, last_name) => {
  try {
    const { data } = await ecommerceApi.post('/session/register', { email, password, first_name, last_name })
    const { token, user } = data
    const { _id, role, cart_id } = user
    localStorage.setItem('token', token)
    return { ok: true, _id, first_name, last_name, role, cart_id }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.errors[0].msg }
  }
}

export const validarToken = async () => {
  try {
    const { data } = await ecommerceApi.get('/session/renew')
    const { token, user } = data
    const { _id, first_name, last_name, role, cart_id } = user
    localStorage.setItem('token', token)
    return { ok: true, _id, first_name, last_name, role, cart_id }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const getUsers = async () => {
  try {
    const { data } = await ecommerceApi.get('/session/users')
    const { users } = data

    return { ok: true, users }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const sendEmailResetPass = async (email) => {
  try {
    const { data } = await ecommerceApi.post('/session/change-password', { email })
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.msg }
  }
}

export const resetPass = async (password, token) => {
  try {
    const { data } = await ecommerceApi.post('/session/reset-password', { password, token })
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.msg }
  }
}

export const deleteUser = async (_id) => {
  try {
    const { data } = await ecommerceApi.post(`/session/delete-user/${_id}`)

    return { ok: true, data }

  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.msg }
  }
}


export const deleteInactiveUsers = async () => {
  try {
    const { data } = await ecommerceApi.post(`/session/delete-users`)
    console.log(data)

    return { ok: true, data }

  } catch (error) {
    console.log(error)
    return { ok: false, msg: error.response.data.msg }
  }
}

//PRODUCTS

export const getProducts = async (pageProducts = 1) => {
  try {

    const { data } = await ecommerceApi.get(`/products?page=${pageProducts}`)

    const { result } = data
    const { payload: produtcs, totalDocs, totalPages, limit, query, page, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    return { ok: true, produtcs, pagination: { totalDocs, totalPages, limit, query, page, hasNextPage, hasPrevPage, prevPage, nextPage } }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const getProductbyId = async (id) => {
  try {

    const { data } = await ecommerceApi.get(`/products/${id}`)

    const { product } = data

    return { ok: true, product: product }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const createProduct = async (producto) => {
  try {
    const { data } = await ecommerceApi.post('/products', producto)
    return { ok: true, producto: data.producto }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

export const deleteProduct = async (idProduct) => {
  try {
    const { data } = await ecommerceApi.delete(`/products/${idProduct}`)
    return { ok: true, msg: data.msg }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

export const updateProduct = async (id, values) => {
  try {
    const { data } = await ecommerceApi.put(`/products/${id}`, values)
    return { ok: true, producto: data.producto }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}


//CARTS

export const getCartById = async (id) => {
  try {
    const { data } = await ecommerceApi.get(`/carts/${id}`)

    return { ok: true, cart: data.cart }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const addProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.post(`/carts/${idCart}/product/${idProduct}`)

    console.log(data)
    return { ok: true, cart: data.cart }

  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

export const removeProductInCart = async (idCart, idProduct, quantity) => {
  try {

    const { data } = await ecommerceApi.put(`/carts/${idCart}/product/${idProduct}`, { quantity })
    console.log(data)
    return { ok: true, cart: data.cart }

  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

export const deleteProductInCart = async (idCart, idProduct) => {
  try {
    const { data } = await ecommerceApi.delete(`/carts/${idCart}/product/${idProduct}`)
    return { ok: true, cart: data.cart }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

export const confirmarCompra = async () => {
  try {
    const { data } = await ecommerceApi.get('/session/renew')
    const { token, user } = data
    const { cart_id } = user
    const { result } = await ecommerceApi.post(`/carts/${cart_id}/purchase`)
    return { ok: true, result }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}


// TICKETS

export const getTickets = async () => {
  try {
    const { data } = await ecommerceApi.get('/tickets')

    return { ok: true, tickets: data.tickets }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

//MERCADO PAGO

export const referenceId = async (idCart) => {
  try {
    const { data } = await ecommerceApi.post(`/carts/create-preference/${idCart}`)
    console.log({ data })
    return { ok: true, idPreference: data.idPreference }
  } catch (error) {
    console.log({ error })
    return { ok: false, msg: error.response.data.msg }
  }
}

//CHAT

export const getMessages = async () => {
  try {
    const { data } = await ecommerceApi.get('/chat')
    const { messages } = data
    console.log(data)
    return { ok: true, messages }

  } catch (error) {
    console.log({ error })
    return { ok: false }
  }
}
