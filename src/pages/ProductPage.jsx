import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  IconButton,
  Chip,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  Fab,
  Zoom,
  Stack,
  Card,
  CardMedia,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useProductStore } from '../hooks/useProductStore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../hooks/useCartStore';
import { useAuthStore } from '../hooks/useAuthStore';
import './ProductPage.css';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();
  const { '*': productId } = useParams();
  const { product, startGetProductById } = useProductStore();
  const { startAddProductInCart, startRemoveProductInCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const productImages =
    product?.images || [product?.thumbnail, product?.thumbnail, product?.thumbnail].filter(Boolean);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      await startGetProductById(productId);
      setIsLoading(false);
    };
    loadProduct();
  }, [productId]);

  const handleQuantityChange = change => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      startAddProductInCart(product._id);
    }
  };

  const handleImageSelect = index => {
    setSelectedImageIndex(index);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />
            <Skeleton variant="rectangular" height={80} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Producto no encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box className="product-page">
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          className="product-breadcrumbs"
        >
          <Link color="inherit" href="/" className="product-breadcrumb-link">
            Inicio
          </Link>
          <Link color="inherit" href="/" className="product-breadcrumb-link">
            Productos
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="product-gallery-container">
              <Paper elevation={0} className="product-main-image">
                <CardMedia
                  component="img"
                  image={productImages[selectedImageIndex]}
                  alt={product.title}
                  className="product-image"
                />
              </Paper>

              {productImages.length > 1 && (
                <Box className="product-thumbnails">
                  {productImages.map((image, index) => (
                    <Card
                      key={index}
                      className={`product-thumbnail ${selectedImageIndex === index ? 'selected' : ''}`}
                      onClick={() => handleImageSelect(index)}
                    >
                      <CardMedia
                        component="img"
                        image={image}
                        className="product-thumbnail-image"
                      />
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" component="h1" className="product-title">
                  {product.title}
                </Typography>

                {/* Rating y reviews */}
                <Box className="product-rating">
                  <Rating value={4.5} readOnly precision={0.1} size="small" />
                  <Typography variant="body2" color="text.secondary">
                    (4.5) • 127 reseñas
                  </Typography>
                  <Chip label="Más vendido" size="small" color="success" variant="outlined" />
                </Box>

                {/* Precio */}
                <Box className="product-price-container">
                  <Typography variant="h4" component="span" className="product-price">
                    ${product.price}
                  </Typography>
                  {product.originalPrice && (
                    <Typography variant="h6" component="span" className="product-original-price">
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Descripción
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {product.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <VerifiedIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {product.stock > 10 ? 'En stock' : `Solo quedan ${product.stock} unidades`}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Cantidad
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Paper className="quantity-controls">
                    <IconButton
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="quantity-button"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" className="quantity-display">
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="quantity-button"
                    >
                      <AddIcon />
                    </IconButton>
                  </Paper>
                  <Typography variant="body2" color="text.secondary">
                    de {product.stock} disponibles
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={2} className="action-buttons">
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={isAdmin || quantity > product.stock}
                  startIcon={<ShoppingCartIcon />}
                  className="add-to-cart-button"
                >
                  {isAdmin ? 'No disponible para admin' : 'Agregar al carrito'}
                </Button>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<FavoriteIcon />}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="wishlist-button"
                    sx={{
                      color: isFavorite ? 'error.main' : 'text.secondary',
                      borderColor: isFavorite ? 'error.main' : 'divider',
                    }}
                  >
                    {isFavorite ? 'En favoritos' : 'Favorito'}
                  </Button>
                  <IconButton
                    size="large"
                    sx={{
                      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                      borderRadius: 2,
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Paper className="product-features">
                <Stack spacing={2}>
                  <Box className="feature-item">
                    <ShippingIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Envío gratis
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        En compras mayores a $50
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SecurityIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Compra segura
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tus datos están protegidos
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Zoom in={true}>
        <Fab
          color="primary"
          className="mobile-cart-fab"
          onClick={handleAddToCart}
          disabled={isAdmin}
        >
          <ShoppingCartIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};
