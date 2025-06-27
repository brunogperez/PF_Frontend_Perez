import { useState } from 'react';
import { 
  Button, 
  CircularProgress, 
  TextField, 
  Typography, 
  Box,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import './RegisterPage.css';

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('El Nombre es obligatorio').min(3, 'El Nombre debe tener al menos 3 caracteres'),
    last_name: Yup.string().required('El Apellido es obligatorio').min(3, 'El Apellido debe tener al menos 3 caracteres'),
    email: Yup.string().required('El email es obligatorio').email('Email Invalido'),
    password: Yup.string().required('El password es obligatorio').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })

  const { values, handleChange, errors } = useFormik({ initialValues, validationSchema });
  const { startRegister } = useAuthStore();

  const { email, password, first_name, last_name } = values;
  const disabled = !(email !== '' && password !== '' && first_name !== '' && last_name !== '');

  const onSubmitForm = async () => {
    const isEmpty = Object.keys(errors).length === 0;
    if (!isEmpty) return;
    
    try {
      setIsLoading(true);
      await startRegister(email, password, first_name, last_name);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box className="register-container">
      <Box className="register-card">
        <Box className="register-content">
          <Box className="register-header">
            <Typography variant="h4" className="register-title">
              Crear Cuenta
            </Typography>
            <Typography variant="body1" className="register-subtitle">
              Completa los datos para crear tu cuenta
            </Typography>
          </Box>
          
          <Box component="form" className="register-form">
            <Box className="form-row">
              <Box className="form-field">
                <TextField
                  name='first_name'
                  value={first_name}
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name}
                  autoComplete="off"
                  className="text-field"
                  InputProps={{
                    sx: { fontSize: '0.95rem' }
                  }}
                />
              </Box>
              
              <Box className="form-field">
                <TextField
                  name='last_name'
                  value={last_name}
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name}
                  autoComplete="off"
                  className="text-field"
                  InputProps={{
                    sx: { fontSize: '0.95rem' }
                  }}
                />
              </Box>
            </Box>
            
            <TextField
              name='email'
              value={email}
              type='email'
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="off"
              className="text-field"
              InputProps={{
                sx: { fontSize: '0.95rem' }
              }}
            />
            
            <TextField
              name='password'
              value={password}
              type='password'
              label="Contraseña"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="off"
              className="text-field"
              InputProps={{
                sx: { fontSize: '0.95rem' }
              }}
            />
            
            <Button
              disabled={disabled || isLoading}
              variant="contained"
              fullWidth
              onClick={onSubmitForm}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              className="register-button"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
            
            <Box className="login-link-container">
              <Typography variant="body2" className="login-text">
                ¿Ya tienes cuenta?{' '}
                <Link to="/session/login" className="login-link">
                  Iniciar Sesión
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Right Panel - Illustration */}
        <Box className="register-illustration">
          <Box className="circle-1" />
          <Box className="circle-2" />
          <Box className="circle-3" />
          <Box className="shape-1" />
          <Box className="triangle" />
          <svg className="wave" viewBox="0 0 120 60">
            <path d="M 0 30 Q 30 0 60 30 T 120 30" />
          </svg>
          <Box className="dot-1" />
          <Box className="dot-2" />
          <Box className="dot-3" />
          
          <Box className="illustration-content">
            <Typography variant="h3" className="illustration-title">
              ¡Únete a nosotros!
            </Typography>
            <Typography variant="body1" className="illustration-text">
              Crea tu cuenta y descubre todo lo que tenemos para ofrecerte.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}