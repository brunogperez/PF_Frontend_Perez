import { Button, Container, Grid, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, ShoppingCart, DeleteOutline } from '@mui/icons-material';
import { useProductStore } from '../hooks/useProductStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../hooks/useCartStore';

export const ProductPage = () => {
    const { '*': productId } = useParams();
    const { product, startGetProductById } = useProductStore();
    const { cart, startAddProductInCart, startRemoveProductInCart } = useCartStore();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        startGetProductById(productId);
    }, [productId]);

    if (!product) {
        return (
            <>
                <Typography variant="h4">Cargando producto...</Typography>
            </>
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

    const handleReset = () => setQuantity(0);

    return (
        <>
      
            <Container maxWidth='md' style={{ marginTop: 30 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img src={product?.thumbnail} alt={product?.title} style={{ maxWidth: '70%', borderRadius: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Typography variant="h4">{product?.title}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">{product?.description}</Typography>
                                <Typography variant="h5">Precio: ${product?.price}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">Stock disponible: {product?.stock}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1" sx={{ color: '#3f51b5', cursor: 'pointer' }}>
                                    Agregar al carrito
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6">{quantity}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleDisminuirQuantity}>
                                            <RemoveCircleOutline />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleAumentarQuantity}>
                                            <AddCircleOutline />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleReset}>
                                            <DeleteOutline />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
