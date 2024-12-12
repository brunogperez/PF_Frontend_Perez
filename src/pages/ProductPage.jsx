import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useProductStore } from '../hooks/useProductStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../hooks/useCartStore';
import { useAuthStore } from '../hooks/useAuthStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const ProductPage = () => {
    const { isAdmin } = useAuthStore()
    const { '*': productId } = useParams();
    const { product, startGetProductById } = useProductStore();
    const { startAddProductInCart, startRemoveProductInCart } = useCartStore();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        startGetProductById(productId);
    }, [productId]);

    if (!product) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}>
                <Typography variant="h4" >
                    <CircularProgress />
                </Typography>
            </Box>
        );
    }

    const handleAumentarQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
            startAddProductInCart(product._id);
        }
    };

    const handleDisminuirQuantity = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
            startRemoveProductInCart(product._id)
        }
    };

    return (
        <>

            <Container maxWidth='md' sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
                minWidth: 100,

            }}>
                <Box sx={{ borderWidth: 2, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <img src={product?.thumbnail} alt={product?.title} style={{ margin: 2, maxWidth: '100%', borderRadius: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column">
                                <Grid item >
                                    <Typography variant="h4">{product?.title}</Typography>
                                    <Typography variant="h5">${product?.price}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{product?.description}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">Stock disponible: {product?.stock}</Typography>
                                </Grid>


                                <Grid item>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Button onClick={handleDisminuirQuantity}>
                                                <RemoveIcon color='action' />
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">{quantity}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={handleAumentarQuantity}>
                                                <AddIcon color='action' />
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' disabled={isAdmin} >
                                        Agregar al carrito
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
