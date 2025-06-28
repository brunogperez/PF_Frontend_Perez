import { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import './ResetPasswordEmailPage.css';

export const ResetPasswordEmailPage = () => {

  const navigate = useNavigate()

  const initialValues = {
    email: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('El email es obligatorio').email('Email invalido'),
  })

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { values, handleChange, errors, handleSubmit, handleBlur, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        await startSendEmailResetPass(values.email);
        setIsSubmitted(true);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  })

  const { email } = values
  const { startSendEmailResetPass } = useAuthStore()

  return (
    <Box className="reset-email-container">
      <Box className="reset-email-card">
        <Typography variant='h4' className="reset-email-title">
          Restablecer Contraseña
        </Typography>
        
        {isSubmitted ? (
          <>
            <Typography variant='body1' className="reset-email-text">
              Hemos enviado un enlace de restablecimiento a <strong>{email}</strong>.
              Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
            </Typography>
            <Typography variant='body2' className="reset-email-success">
              Si no ves el correo, revisa tu carpeta de spam.
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link to="/session/login" className="reset-email-link">
                Volver al inicio de sesión
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Typography variant='body1' className="reset-email-text">
              Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </Typography>
            
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              className="reset-email-form"
              noValidate
            >
              <TextField
                label='Correo electrónico'
                type='email'
                placeholder='Ingresa tu correo electrónico'
                fullWidth
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                size="small"
                margin="normal"
                InputProps={{
                  sx: { fontSize: '0.95rem' }
                }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                className="reset-email-button"
                disabled={isLoading || !email || Object.keys(errors).length > 0}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Enviar enlace'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  ¿Recordaste tu contraseña?{' '}
                  <Link to="/session/login" className="reset-email-link">
                    Iniciar Sesión
                  </Link>
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
