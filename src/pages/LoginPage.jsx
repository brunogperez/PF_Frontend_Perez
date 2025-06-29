import { useState } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import './LoginPage.css';

export const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('El email es obligatorio').email('Email Invalido'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        await startLogin(values.email, values.password);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const { email, password } = values;
  const disabled = !email || !password || Object.keys(errors).length > 0;

  const { startLogin } = useAuthStore();

  return (
    <Box className="login-container">
      <Box className="login-card">
        <Box className="login-illustration">
          <Box className="circle-1" />
          <Box className="circle-2" />
          <Box className="circle-3" />
          <Box className="shape-1" />
          <svg className="wave" viewBox="0 0 100 100">
            <path d="M 10 50 Q 50 10 90 50" />
          </svg>
          <Box className="dot-1" />
          <Box className="dot-2" />

          <Box className="illustration-content">
            <Typography variant="h3" className="illustration-title">
              ¡Bienvenido de vuelta!
            </Typography>
            <Typography variant="body1" className="illustration-text">
              Inicia sesión para acceder a tu cuenta existente.
            </Typography>
          </Box>
        </Box>

        <Box className="login-content">
          <Box className="login-header">
            <Typography variant="h4" className="login-title">
              Iniciar Sesión
            </Typography>
          </Box>

          <Box component="form" className="login-form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              value={email}
              type="email"
              label="Nombre de usuario o email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              className="text-field"
              InputProps={{
                sx: { fontSize: '0.95rem' },
              }}
            />

            <TextField
              name="password"
              value={password}
              type="password"
              label="Contraseña"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              className="text-field"
              InputProps={{
                sx: { fontSize: '0.95rem' },
              }}
            />

            <Box className="login-options">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="remember-me"
                  />
                }
                label={
                  <Typography variant="body2" className="remember-me-label">
                    Recordarme
                  </Typography>
                }
              />

              <Link to="/session/email" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              disabled={disabled || isLoading}
              variant="contained"
              fullWidth
              type="submit"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              className="login-button"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            <Box className="register-link-container">
              <Typography variant="body2" className="register-text">
                ¿Nuevo aquí?{' '}
                <Link to="/session/register" className="register-link">
                  Crear una cuenta
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
