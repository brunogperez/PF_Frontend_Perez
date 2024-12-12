
import { Container, Grid, Typography, TextField, Button, Link, Box } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';



export const Footer = () => {

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/5492618995005?text=Hola,%20quiero%20más%20información');
    };

    return (
        <Box sx={{
            padding: 6,
            textAlign: 'center',
            backgroundColor:'#FF6300'
        }}>
            <Container maxWidth="lg">
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
                            />
                            <Button variant="contained"  type="submit">
                                Enviar
                            </Button>
                        </Box>
                    </Grid>
                    {/* Sección de contacto */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Contacto
                        </Typography>
                        <ul>
                            <li>
                                    <PhoneIcon color='action' />542618995005
                                <Link href="tel:+5492618995005" sx={{ color: 'black', margin: 2 }}>
                                </Link>
                            </li>
                            <li>
                                <WhatsAppIcon onClick={handleWhatsAppClick}  color='action'/>
                                <Link href="https://wa.me/5492618995005" sx={{color:'black', margin:1}}>WhatsApp: 5492618995005</Link>
                            </li>
                            <li>
                                <MailIcon  color='action' />
                                <Link href="mailto:digitalage@gmail.com" sx={{ color: 'black', margin: 1 }}>digitalage@gmail.com</Link>
                            </li>
                            <li>El Challao, Mendoza, Argentina</li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

