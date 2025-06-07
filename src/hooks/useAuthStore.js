import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteInactiveUsers,
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  resetPass,
  sendEmailResetPass,
  switchRole,
  validarToken,
} from "../api/requestApi";
import { onGetUsers, onLogin, onLogout } from "../store/authSlice";
import { useCartStore } from "./useCartStore";

export const useAuthStore = () => {
  const dispatch = useDispatch();
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
  } = useSelector((state) => state.auth);

  const { startGetCartById } = useCartStore();

  const startLogin = async (email, password) => {
    try {
      const resp = await loginUser(email, password);
      if (resp.ok) {
        const { _id, cart_id, last_name, first_name, role } = resp;
        // First update the auth state
        dispatch(onLogin({ _id, cart_id, last_name, first_name, role }));
        // Then load the cart if cart_id exists
        if (cart_id) {
          await startGetCartById(cart_id);
        }
        return { ok: true };
      }
      return Swal.fire({
        title: "Ha ocurrido un error",
        html: "Por favor, intenta nuevamente",
        icon: "error",
      });
    } catch (error) {
      console.error('Login error:', error);
      return Swal.fire({
        title: "Error de conexión",
        html: "No se pudo conectar con el servidor",
        icon: "error",
      });
    }
  };

  const startRegister = async (email, password, first_name, last_name) => {
    const resp = await registerUser(email, password, first_name, last_name);
    if (resp.ok) {
      const { _id, cart_id, last_name, first_name, role } = resp;
      return dispatch(onLogin({ _id, cart_id, last_name, first_name, role }));
    }
    return Swal.fire({
      title: "Ha ocurrido un error",
      html: "Por favor, intenta nuevamente",
      icon: "error",
    });
  };

  const startLogout = async () => {
    dispatch(onLogout());
    localStorage.clear();
  };

  const startCheckingLogin = async () => {
    try {
      const resp = await validarToken();
      if (resp.ok) {
        const { _id, cart_id, last_name, first_name, role } = resp;
        // Dispatch login first to update auth state
        dispatch(onLogin({ _id, cart_id, last_name, first_name, role }));
        // Then load cart if cart_id exists
        if (cart_id) {
          await startGetCartById(cart_id);
        }
        return;
      }
      // If we get here, token validation failed
      startLogout();
    } catch (error) {
      console.error('Error during login check:', error);
      startLogout();
    }
  };

  const startResetPass = async (password, token) => {
    const resp = await resetPass(password, token);
    if (resp.ok) {
      Swal.fire({
        title: "Contraseña reseteada",
        html: "Tu contraseña fue cambiada correctamente",
        icon: "success",
      });
      return true;
    }

    Swal.fire({
      title: "Ocurrió un error",
      html: "Por favor, intenta nuevamente",
      icon: "error",
    });

    return false;
  };

  const startSendEmailResetPass = async (email) => {
    const resp = await sendEmailResetPass(email);
    if (resp.ok) {
      return Swal.fire({
        title: "Email enviado",
        html: "Se te envio un email a tu casilla de correo para continuar el reset de tu contraseña",
        icon: "success",
      });
    }

    return Swal.fire({
      title: "Ocurrió un error",
      html: "Por favor, intenta nuevamente",
      icon: "error",
    });
  };

  const startGetUsers = async () => {
    const { users } = await getUsers();
    if (users) {
      dispatch(onGetUsers(users));
      return;
    }
    return Swal.fire({
      title: "Ocurrio un error al obtener los usuarios",
      html: "Por favor intentarlo mas tarde",
      icon: "error",
    });
  };

  const startDeleteUser = async (id) => {
    const { data } = await deleteUser(id);
    const { users } = await getUsers();
    if (users,data) {
      dispatch(onGetUsers(users));
      return Swal.fire({
        title: "Proceso exitoso",
        html: "Usuario eliminado!",
        icon: "success",
      });
    }
    return Swal.fire({
      title: "Ocurrio un error al obtener los usuarios",
      html: "Por favor intentarlo mas tarde",
      icon: "error",
    });
  };

  const startDeleteInactive = async () => {
    const { data } = await deleteInactiveUsers();
    const { users } = await getUsers();
    if (users, data) {
      dispatch(onGetUsers(users));
      return Swal.fire({
        title: "Proceso exitoso",
        html: "Usuarios eliminados!",
        icon: "success",
      });
    }
    return Swal.fire({
      title: "Ocurrio un error al obtener los usuarios",
      html: "Por favor intentarlo mas tarde",
      icon: "error",
    });
  };

  const startSwitchRole = async (id, newRole) => {
    try {
      const { data } = await switchRole(id, newRole);
      const { users } = await getUsers();
      if (users && data) {
        dispatch(onGetUsers(users));
        return Swal.fire({
          title: "Proceso exitoso",
          html: `Rol cambiado a ${newRole}!`,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error al cambiar el rol:', error);
    }
    
    return Swal.fire({
      title: "Ocurrió un error al cambiar el rol",
      html: "Por favor intenta nuevamente más tarde",
      icon: "error",
    });
  };

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
    startDeleteInactive,
    startDeleteUser,
    startSwitchRole,
  };
};
