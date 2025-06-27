import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  alpha,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material'
import { 
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Receipt as ReceiptIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Inventory as InventoryIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'
import { useCartStore } from '../hooks/useCartStore'
import { useState } from 'react'

export const NavBar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const { first_name, status, isAdmin, startLogout } = useAuthStore()
  const { cart } = useCartStore()
  
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const onLogout = () => {
    startLogout()
    handleMenuClose()
  }

  const navigationItems = [
    { 
      label: 'Chat', 
      path: '/chat', 
      icon: <ChatIcon />, 
      show: status === 'authenticated' 
    },
    { 
      label: 'Usuarios', 
      path: '/users-page', 
      icon: <SupervisorAccountIcon />, 
      show: isAdmin 
    },
    { 
      label: 'Productos', 
      path: '/admin-product', 
      icon: <InventoryIcon />, 
      show: isAdmin 
    }
  ]

  const userMenuItems = [
    { 
      label: 'Mis Compras', 
      path: '/mis-compras', 
      icon: <ReceiptIcon />, 
      show: status === 'authenticated' 
    }
  ]

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px',
          mt: 1,
          minWidth: 200,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {first_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isAdmin ? 'Administrador' : 'Usuario'}
        </Typography>
      </Box>
      <Divider />
      {userMenuItems.filter(item => item.show).map((item) => (
        <MenuItem
          key={item.path}
          onClick={() => {
            navigate(item.path)
            handleMenuClose()
          }}
          sx={{
            py: 1.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {item.icon}
            <Typography>{item.label}</Typography>
          </Box>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        onClick={onLogout}
        sx={{
          py: 1.5,
          color: 'error.main',
          '&:hover': {
            backgroundColor: alpha(theme.palette.error.main, 0.08)
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LogoutIcon />
          <Typography>Cerrar Sesión</Typography>
        </Box>
      </MenuItem>
    </Menu>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2 }}>
        <img 
          src="logo-digital-age.webp" 
          alt="Logo" 
          style={{ height: 50, objectFit: 'contain' }}
        />
      </Box>
      <Divider />
      <List>
        {navigationItems.filter(item => item.show).map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main'
                  }
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(160, 53, 20) 100%)',
          borderBottom: `1px solid ${alpha('#000', 0.12)}`,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                sx={{
                  height: 50,
                  objectFit: "contain",
                }}
                alt='logo'
                src='/logo-digital-age.webp'
              />
            </NavLink>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, flexGrow: 1 }}>
              {navigationItems.filter(item => item.show).map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    mr: 1,
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.1),
                    },
                    '&.active': {
                      backgroundColor: alpha('#fff', 0.2),
                      fontWeight: 600,
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {status === 'authenticated' ? (
              <>
                <IconButton
                  component={NavLink}
                  to="/mi-carrito"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.1),
                    }
                  }}
                >
                  <Badge 
                    badgeContent={cart?.products?.length || 0} 
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#FF5722',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.1),
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: alpha('#fff', 0.2),
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    {first_name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <Button
                component={NavLink}
                to="/session/login"
                startIcon={<LoginIcon />}
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.1),
                    borderColor: 'rgba(255,255,255,0.5)',
                  }
                }}
              >
                Ingresar
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            borderRadius: '0 12px 12px 0'
          },
        }}
      >
        {drawer}
      </Drawer>

      {renderMenu}
    </Box>
  )
}