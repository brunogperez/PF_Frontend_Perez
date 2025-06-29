import { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import queryString from 'query-string';
import './ResetPasswordPage.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { token = '' } = queryString.parse(location.search);

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, errors, handleSubmit, handleBlur, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        const result = await startResetPass(values.password, token);
        if (result) {
          navigate('/session/login');
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const { password } = values;
  const { startResetPass } = useAuthStore();

  return (
    <Box className="reset-password-container">
      <Box className="reset-password-card">
        <Typography variant="h4" className="reset-password-title">
          Restablecer Contraseña
        </Typography>

        <Typography variant="body1" className="reset-password-text">
          Ingresa tu nueva contraseña a continuación.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="reset-password-form" noValidate>
          <TextField
            label="Nueva Contraseña"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            fullWidth
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            variant="outlined"
            size="small"
            margin="normal"
            InputProps={{
              sx: { fontSize: '0.95rem' },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="reset-password-button"
            disabled={isLoading || !password || Object.keys(errors).length > 0}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Restablecer Contraseña'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/session/login" className="reset-password-link">
                Iniciar Sesión
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
