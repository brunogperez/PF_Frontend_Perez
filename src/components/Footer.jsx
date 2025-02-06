
import { Container, Grid, Typography, TextField, Link, Box } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';



export const Footer = () => {

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/5492618995005?text=Hola,%20quiero%20más%20información');
    };

    return (
        <Box 
            className="padding-40  bg-orange-500 justify-center items-center" >
            <Container className='max-w-7xl'>
                <Grid container spacing={3}>
                    {/* Sección de newsletter */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Suscríbete a nuestro newsletter
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                            noValidate autoComplete="off">
                            <TextField
                                id="email"
                                label="Ingresa tu email..."
                                fullWidth
                                margin="normal"
                                variant='standard'
                            />
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                        </Box>
                    </Grid>
                    {/* Sección de contacto */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Contacto
                        </Typography>
                        <ul>
                            <li>
                                <PhoneIcon color='action' />54261323451
                                <Link href="tel:+549261452" sx={{ color: 'black', margin: 2 }}>
                                </Link>
                            </li>
                            <li>
                                <WhatsAppIcon onClick={handleWhatsAppClick} color='action' />
                                <Link href="https://wa.me/54926156056" sx={{ color: 'black', margin: 1 }}>WhatsApp: 54926185675675005</Link>
                            </li>
                            <li>
                                <MailIcon color='action' />
                                <Link href="mailto:empresa@gmail.com" sx={{ color: 'black', margin: 1 }}>empresa@gmail.com</Link>
                            </li>
                            <li>El Challao, Mendoza, Argentina</li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

