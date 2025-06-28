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
    let loginSuccessful = false;
    
    try {
      const resp = await validarToken();
      
      if (resp.ok) {
        const { _id, cart_id, last_name, first_name, role } = resp;
        // Dispatch login first to update auth state
        dispatch(onLogin({ _id, cart_id, last_name, first_name, role }));
        loginSuccessful = true;
        
        // Then load cart if cart_id exists
        if (cart_id) {
          try {
            await startGetCartById(cart_id);
          } catch (cartError) {
            console.error('Error loading cart:', cartError);
            // Continue even if cart loading fails
          }
        }
        return { ok: true };
      }
      
      // Handle failed token validation
      console.warn('Token validation failed:', resp.error || 'Unknown error');
      if (resp.status === 500) {
        console.error('Server error during token validation');
      }
      
      return { ok: false, error: resp.error };
      
    } catch (error) {
      console.error('Unexpected error during login check:', error);
      return { ok: false, error: 'Unexpected error' };
    } finally {
      // Only logout if login was not successful
      if (!loginSuccessful) {
        startLogout();
      }
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
    try {
      console.log(`[AuthStore] Starting to delete user with ID: ${id}`);
      const { ok, data, msg, status } = await deleteUser(id);
      
      if (!ok) {
        // Handle specific error statuses
        if (status === 403) {
          throw new Error('No tienes permisos para realizar esta acción');
        } else if (status === 404) {
          throw new Error('El usuario no fue encontrado');
        } else if (status === 400) {
          throw new Error('No puedes eliminar tu propia cuenta');
        } else {
          throw new Error(msg || 'Error al eliminar el usuario');
        }
      }
      
      console.log('[AuthStore] User deleted, refreshing users list...');
      
      // Refresh the users list
      const { ok: usersOk, users, msg: usersMsg } = await getUsers();
      
      if (!usersOk) {
        console.error('[AuthStore] Error refreshing users list:', usersMsg);
        throw new Error('Usuario eliminado, pero no se pudo actualizar la lista de usuarios');
      }
      
      dispatch(onGetUsers(users));
      
      await Swal.fire({
        title: "¡Éxito!",
        text: msg || "Usuario eliminado correctamente",
        icon: "success"
      });
      
      console.log('[AuthStore] User deletion process completed successfully');
      return true;
      
    } catch (error) {
      console.error('[AuthStore] Error in startDeleteUser:', {
        error: error.message,
        stack: error.stack,
        userId: id
      });
      
      await Swal.fire({
        title: "Error",
        text: error.message || 'Ocurrió un error inesperado al eliminar el usuario',
        icon: "error",
        confirmButtonText: "Entendido"
      });
      
      return false;
    }
  };

  const startDeleteInactive = async () => {
    try {
      const { ok, data } = await deleteInactiveUsers();
      if (!ok) {
        throw new Error('Error al eliminar usuarios inactivos');
      }
      
      const { ok: usersOk, users } = await getUsers();
      if (!usersOk) {
        throw new Error('Error al obtener la lista actualizada de usuarios');
      }
      
      dispatch(onGetUsers(users));
      
      Swal.fire({
        title: "Proceso exitoso",
        html: "Usuarios inactivos eliminados correctamente",
        icon: "success",
      });
      
      return true;
    } catch (error) {
      console.error('Error en startDeleteInactive:', error);
      Swal.fire({
        title: "Error",
        html: error.message || "Ocurrió un error al eliminar usuarios inactivos",
        icon: "error",
      });
      return false;
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
