
import { useState } from 'react';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'

export const LoginPage = () => {

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('El email es obligatorio').email('Email Invalido'),
    password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })

  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, errors } = useFormik({ initialValues, validationSchema });
  const { startLogin } = useAuthStore();

  const { email, password } = values;

  const disabled = (email != '' && password != '') ? false : true;

  const onSubmitForm = async () => {
    const isEmpty = Object.keys(errors).length === 0;
    if (!isEmpty) return;
    
    try {
      setIsLoading(true);
      await startLogin(email, password);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh' }}
    >
      <Grid item sx={{ width: 500, height: 450, backgroundColor: 'white', borderRadius: 2, padding: 3, alignContent: 'center' }}>
        <Typography variant='h4'>Login</Typography>
        <Grid container>
          <Grid item mt={3} xs={12}>
            <TextField
              name='email'
              value={email}
              type='email'
              label="Email"
              variant="filled"
              id="login-email"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item mt={1} xs={12}>
            <TextField
              name='password'
              value={password}
              type='password'
              label="Password"
              variant="filled"
              id="login-password"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
          <Grid item mt={3} xs={12}>
            <Button
              disabled={disabled || isLoading}
              variant="contained"
              color="primary"
              onClick={onSubmitForm}
              fullWidth
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='end' mt={2}>
            <Link to='/session/register'>¿No tienes cuenta? Registrarse</Link>
          </Grid>
          <Grid container direction='row' justifyContent='end' mt={2}>
            <Link to='/session/email'>¿Reestablecer contraseña?</Link>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}
