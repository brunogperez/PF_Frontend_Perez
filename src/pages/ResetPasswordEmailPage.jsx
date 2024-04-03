import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuthStore } from '../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'

export const ResetPasswordEmailPage = () => {

  const navigate = useNavigate()

  const initialValues = {
    email: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('El email es obligatorio').email('Email invalido'),
  })

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      startSendEmailResetPass(values.email)
      navigate('/')
    }
  })

  const { email } = values
  const { startSendEmailResetPass } = useAuthStore()

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backgroundColor: '#262254' }}
    >

      <Grid item sx={{ width: 450, backgroundColor: 'white', borderRadius: 2, padding: 3 }}>

        <Typography variant='h5'>Ingrese el email</Typography>

        <Grid container>

          <Grid item mt={2} xs={12}>
            <TextField
              name='email'
              value={email}
              type='email'
              label='Email'
              variant='outlined'
              size='small'
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item mt={2} xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth>Enviar email</Button>
          </Grid>

        </Grid>

      </Grid>

    </Grid>
  )
}
