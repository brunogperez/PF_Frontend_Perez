import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { deleteInactiveUsers, getUsers, loginUser, registerUser, resetPass, sendEmailResetPass, validarToken } from '../api/requestApi'
import { onGetUsers, onLogin, onLogout } from '../store/authSlice'
import { useCartStore } from './useCartStore'
import { useTicketStore } from './useTicketStore'



export const useAuthStore = () => {

  const dispatch = useDispatch()
  const {
    users,
    _id,
    first_name,
    last_name,
    email,
    role,
    cart_id,
    status,
    isAdmin,
  } = useSelector(state => state.auth)

  const { startGetCartById } = useCartStore()
  const { startGetTickets } = useTicketStore()

  const startLogin = async (email, password) => {
    const resp = await loginUser(email, password)
    if (resp.ok) {
      const { _id, cart_id, last_name, first_name, role } = resp
      startGetCartById(cart_id)
      return dispatch(onLogin({ _id, cart_id, last_name, first_name, role }))
    }
    return Swal.fire({
      title: 'Ha ocurrido un error',
      html: resp.msg,
      icon: 'error',
    })
  }

  const startRegister = async (email, password, first_name, last_name) => {
    const resp = await registerUser(email, password, first_name, last_name)
    if (resp.ok) {
      const { _id, cart_id, last_name, first_name, role } = resp
      return dispatch(onLogin({ _id, cart_id, last_name, first_name, role }))
    }
    return Swal.fire({
      title: 'Ha ocurrido un error',
      html: resp.msg,
      icon: 'error',
    })
  }

  const startLogout = async () => {
    dispatch(onLogout())
    localStorage.clear()
  }

  const startCheckingLogin = async () => {
    const resp = await validarToken()
    if (resp.ok) {
      const { _id, cart_id, last_name, first_name, role } = resp
      startGetCartById(cart_id)
      return dispatch(onLogin({ _id, cart_id, last_name, first_name, role }))
    }
    startLogout()
  }

  const startResetPass = async (password, token) => {
    const resp = await resetPass(password, token);
    if (resp.ok) {
      Swal.fire({
        title: 'Contraseña reseteada',
        html: 'Tu contraseña fue cambiada correctamente',
        icon: 'success',
      });
      return true;
    }

    Swal.fire({
      title: 'Uhh ocurrio un error',
      html: resp.msg,
      icon: 'error',
    });

    return false;
  }

  const startSendEmailResetPass = async (email) => {
    const resp = await sendEmailResetPass(email);
    if (resp.ok) {
      return Swal.fire({
        title: 'Email enviado',
        html: 'Se te envio un email a tu casilla de correo para continuar el reset de tu contraseña',
        icon: 'success',
      });
    }

    return Swal.fire({
      title: 'Uhh ocurrio un error',
      html: resp.msg,
      icon: 'error',
    });
  }

  const startGetUsers = async () => {

    const { users } = await getUsers()


    if (users) {
      dispatch(onGetUsers(users))
      return
    }
    return Swal.fire({
      title: 'Ocurrio un error al obtener los usuarios',
      html: 'Por favor intentarlo mas tarde',
      icon: 'error',
    })
  }

  const startDeleteInactive = async () => {
    const { users } = await deleteInactiveUsers()
    if (users) {
      dispatch(onGetUsers(users))
      return
    }
    /*     return Swal.fire({
          title: 'Ocurrio un error al obtener los usuarios',
          html: 'Por favor intentarlo mas tarde',
          icon: 'error',
        }) */

  }

  return {
    users,
    _id,
    first_name,
    last_name,
    email,
    role,
    cart_id,
    status,
    isAdmin,

    startLogin,
    startRegister,
    startCheckingLogin,
    startLogout,
    startSendEmailResetPass,
    startResetPass,
    startGetUsers,
    startDeleteInactive
  }
}