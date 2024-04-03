import React from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

export const RegisterPage = () => {

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

  const disabled = (email != '' && password != '' && first_name != '' && last_name != '') ? false : true;

  const onSubmitForm = () => {
    const isEmpty = Object.keys(errors).lenght === 0;
    if (isEmpty) return;
    startRegister(email, password, first_name, last_name);
  }

  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backgroundColor: '#4FB477' }}
    >
      <Grid item sx={{ width: 450, backgroundColor: '#dcfffd', borderRadius: 2, padding: 3 }}>

        <Typography variant='h4'>Registro</Typography>

        <Grid container>

          <Grid item mt={3} xs={12}>
            
            <TextField
              name='first_name'
              value={first_name}
              label="Nombre"
              variant="outlined"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.first_name)}
              helperText={errors.first_name}
              autoComplete="off"
            />
          </Grid>

          <Grid item mt={1} xs={12}>
            <TextField
              name='last_name'
              value={last_name}
              label="Apellido"
              variant="outlined"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.last_name)}
              helperText={errors.last_name}
              autoComplete="off"
            />
          </Grid>

          <Grid item mt={1} xs={12}>
            <TextField
              name='email'
              value={email}
              type='email'
              label="Email"
              variant="outlined"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="off"
            />
          </Grid>

          <Grid item mt={1} xs={12}>
            <TextField
              name='password'
              value={password}
              type='password'
              label="Password"
              variant="outlined"
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="off"
            />
          </Grid>

          <Grid item mt={3} xs={12}>
            <Button
              disabled={disabled}
              color="success"
              onClick={onSubmitForm}
              variant="contained"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end' mt={2}>
            <Link to='/session/login'>¿Ya tienes cuenta? Login</Link>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}