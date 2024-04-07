import { Avatar, Badge, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import { useAuthStore } from '../hooks/useAuthStore'
import { useCartStore } from '../hooks/useCartStore'

export const NavBar = () => {

  const { first_name, status, isAdmin, startLogout } = useAuthStore()
  const { cart } = useCartStore()

  const onLogout = () => startLogout()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'black'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px', padding: '5px', marginLeft: '20px' }}>
        <NavLink to='/'>
          <Avatar alt='logo' src='logo-digital-age.webp' sx={{ width: 130, height: 70 }} />
        </NavLink>
        {
          status === 'authenticated' &&
          <NavLink to='/chat' className='navbar-brand' style={{ marginLeft: '20px',marginRight: '20px', color: 'white' }}>CHAT</NavLink>
        }
        <div>
          {
            isAdmin &&
            <>
              <NavLink
                to='/users-page'
                className='navbar-brand'
                style={{ marginLeft: '15px', color: 'white' }}>
                Usuarios
              </NavLink>

              <NavLink
                to='/admin-product'
                className='navbar-brand'
                style={{ marginLeft: '15px', color: 'white' }}>
                Productos
              </NavLink>
            </>
          }
        </div>
      </div>
      <div style={{ marginRight: '50px' }}>

        {
          status === 'authenticated'
            ?

            <>

              <NavLink
                className='navbar-brand'
                style={{ marginRight: '40px', color: 'white' }}>{first_name}
              </NavLink>
              <NavLink
                to={`${status === 'not-authenticated' ? '/session/login' : '/mis-compras'}`}
                className='navbar-brand'
                style={{ marginRight: '15px', color: 'white' }}>Mis compras</NavLink>
              <NavLink
                to={`${status === 'not-authenticated' ? '/session/login' : '/mi-carrito'}`}
                className='navbar-brand'
                style={{ marginRight: '10px', color: 'white' }}>
                <Badge badgeContent={cart?.products.length} color="primary"></Badge>
                <LocalGroceryStoreOutlinedIcon />
              </NavLink>
              <Button size="small" onClick={onLogout}>Cerrar sesión</Button>
            </>
            :
            <>
              <NavLink
                to='/session/register'
                className='navbar-brand'
                style={{ marginRight: '15px', color: 'white' }}>Crear cuenta</NavLink>
              <NavLink
                to='/session/login'
                className='navbar-brand'
                style={{ marginRight: '15px', color: 'white' }}>Ingresar</NavLink>
            </>
        }

      </div>
    </div >
  )
}
