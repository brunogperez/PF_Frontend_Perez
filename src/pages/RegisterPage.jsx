import { useState } from 'react';
import { 
  Button, 
  CircularProgress, 
  TextField, 
  Typography, 
  Box,
  Grid,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
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
    first_name: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    last_name: Yup.string()
      .required('El apellido es obligatorio')
      .min(3, 'El apellido debe tener al menos 3 caracteres'),
    email: Yup.string()
      .required('El email es obligatorio')
      .email('Ingresa un email válido'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales'
      )
  });

  const navigate = useNavigate();
  const { startRegister } = useAuthStore();
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setFieldError, setTouched }) => {
      try {
        // Mark all fields as touched to show validation errors
        setTouched({
          first_name: true,
          last_name: true,
          email: true,
          password: true
        });
        
        // Validate fields before submitting
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
          return; // Don't submit if there are validation errors
        }
        
        const result = await startRegister(
          values.email, 
          values.password, 
          values.first_name, 
          values.last_name
        );
        
        if (result && result.ok) {
          navigate('/');
        } else if (result && result.errors) {
          // Handle field-specific errors from backend
          Object.entries(result.errors).forEach(([field, error]) => {
            setFieldError(field, error.msg);
          });
        } else if (result && result.msg) {
          setFieldError('submit', result.msg);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setFieldError('submit', 'Ocurrió un error al registrar el usuario');
      } finally {
        setSubmitting(false);
      }
    }
  });
  
  const { isSubmitting, errors, touched, handleSubmit, handleChange, values } = formik;
  const { email, password, first_name, last_name } = values;

  // La función de envío ahora está en formik.onSubmit

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
          
          <Box component="form" onSubmit={handleSubmit} className="register-form">
            <Box className="form-row">
              <Box className="form-field">
                <TextField
                  name='first_name'
                  value={first_name}
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
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
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
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
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              autoComplete="off"
              className="text-field"
              InputProps={{
                sx: { fontSize: '0.95rem' }
              }}
            />
            
            <Box className="password-field-container">
              <TextField
                name='password'
                value={password}
                type='password'
                label="Contraseña"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={
                  touched.password && errors.password ? (
                    <Box component="span" sx={{ color: '#d32f2f', fontSize: '0.75rem' }}>
                      {errors.password}
                    </Box>
                  ) : (
                    <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
                    </Box>
                  )
                }
                autoComplete="off"
                className="text-field"
                InputProps={{
                  sx: { 
                    fontSize: '0.95rem',
                    '&.Mui-error': {
                      '& fieldset': {
                        borderColor: '#d32f2f !important',
                      },
                    },
                  }
                }}
                FormHelperTextProps={{
                  sx: {
                    margin: '4px 0 0 0',
                    lineHeight: 1.2,
                  }
                }}
              />
            </Box>
            
            <Button
              disabled={isSubmitting || Object.keys(errors).length > 0}
              variant="contained"
              fullWidth
              type="submit"
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              className="register-button"
              sx={{
                mt: 2,
                backgroundColor: '#FF6B35',
                '&:hover': {
                  backgroundColor: '#E65A2B',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)'
                }
              }}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
            
            {errors.submit && (
              <Box 
                sx={{
                  mt: 2,
                  p: 1.5,
                  backgroundColor: '#FFEBEE',
                  borderRadius: 1,
                  borderLeft: '4px solid #D32F2F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <ErrorOutlineIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="body2" color="error">
                  {errors.submit}
                </Typography>
              </Box>
            )}
            
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