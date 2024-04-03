import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuthStore } from '../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'

export const ResetPasswordPage = () => {

    const navigate = useNavigate()

    const { token = '' } = queryString.parse(location.search)

    const initialValues = {
        password: ''
    }

    const validationSchema = Yup.object({
        password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    })

    const { values, handleChange, errors, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const result = await startResetPass(values.password, token)
            result && navigate('/session/login')
        }
    })

    const { password } = values
    const { startResetPass } = useAuthStore()

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

                <Typography variant='h5'>Restablecer Contraseña.</Typography>

                <Grid container>

                    <Grid item mt={2} xs={12}>
                        <TextField
                            name='password'
                            value={password}
                            type='password'
                            label='Nueva Contraseña'
                            variant='outlined'
                            size='small'
                            fullWidth
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                    </Grid>

                    <Grid item mt={2} xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            fullWidth>Restablecer Contraseña</Button>
                    </Grid>

                </Grid>

            </Grid>

        </Grid>
    )
}
