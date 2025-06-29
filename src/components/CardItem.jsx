import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
  CardActionArea,
  ButtonBase,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../hooks/useProductStore';

export const CardItem = product => {
  const { startProductActivo } = useProductStore();
  const navigate = useNavigate();
  const theme = useTheme();

  const onClickCard = () => {
    startProductActivo({ ...product });
    navigate(`/product/${product._id}`);
  };

  return (
    <Card
      sx={{
        width: 280,
        height: 380,
        borderRadius: 2, // 16px - Material Design bordes redondeados
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.08)', // Material Design elevation
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Material Design easing
        cursor: 'pointer',
        border: 'none',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 8px 24px rgba(0, 0, 0, 0.12)', // Elevación al hover
          transform: 'translateY(-2px)', // Efecto lift sutil
        },
        '&:active': {
          transform: 'translateY(0px)',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <CardActionArea
        onClick={onClickCard}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '&:hover .MuiCardActionArea-focusHighlight': {
            opacity: 0.04, // Material Design ripple opacity
          },
        }}
      >
        {/* Imagen del producto */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#fafafa', // Fondo neutro para la imagen
          }}
        >
          <CardMedia
            component="img"
            height="220"
            image={product.thumbnail}
            alt={product.title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.05)', // Zoom sutil en hover
              },
            }}
          />

          {/* Chip de estado o descuento (opcional) */}
          {product.discount && (
            <Chip
              label={`-${product.discount}%`}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: theme.palette.error.main,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>

        {/* Contenido de la card */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 1.5,
            '&:last-child': { pb: 1.5 }, // Override MUI default padding
          }}
        >
          {/* Título del producto */}
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 500,
              lineHeight: 1.3,
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '2.6em', // Espacio fijo para 2 líneas
              color: theme.palette.text.primary,
            }}
          >
            {product.title}
          </Typography>

          {/* Rating y reviews */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              gap: 1,
            }}
          >
            <Rating
              value={product.rating || 4.5}
              readOnly
              precision={0.1}
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#ffa726', // Material Design amber
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              ({product.reviewCount || '5.0'})
            </Typography>
          </Box>

          {/* Espaciador flexible */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Precio y botón de acción */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            <Box>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'line-through',
                    fontSize: '0.875rem',
                  }}
                >
                  ${product.originalPrice}
                </Typography>
              )}
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  fontSize: '1.25rem',
                }}
              >
                ${product.price}
              </Typography>
            </Box>

            {/* Botón de acción */}
            <ButtonBase
              sx={{
                borderRadius: 1,
                px: 2,
                py: 0.75,
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'scale(1.02)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              onClick={e => {
                e.stopPropagation();
                onClickCard();
              }}
            >
              Ver más
            </ButtonBase>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
