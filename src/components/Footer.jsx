import { Container, Grid, Typography, TextField, Link, Box, Button, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { alpha } from '@mui/material/styles';

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5492618995005?text=Hola,%20quiero%20más%20información');
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(160, 53, 20) 100%)',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sección de newsletter */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Suscríbete a nuestro newsletter
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 2 }}>
              <TextField
                id="email"
                placeholder="Ingresa tu email..."
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>

          {/* Sección de contacto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: 'white' }} />
                <Link href="tel:+54261323451" color="inherit" underline="hover">
                  +54 261 323-4512
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <WhatsAppIcon sx={{ color: 'white' }} />
                <Link
                  href="https://wa.me/54926156056"
                  color="inherit"
                  underline="hover"
                  onClick={handleWhatsAppClick}
                  sx={{ cursor: 'pointer' }}
                >
                  +54 9 261 567-5675
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MailIcon sx={{ color: 'white' }} />
                <Link href="mailto:contacto@digitalage.com" color="inherit" underline="hover">
                  contacto@digitalage.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                <Typography variant="body2">El Challao, Mendoza, Argentina</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            © {new Date().getFullYear()} Digital Age. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
