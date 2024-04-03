import { Add, Remove, Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'

export const CardItemCart = (product) => {
    const { _id, title, price, stock, thumbnail } = product.id
    const { quantity } = product

    
    const [cantidad, setCantidad] = useState(quantity)
    const {  startAddProductInCart, startRemoveProductInCart, startDeleteProductInCart } = useCartStore()

    const handleAumentarQuantity = () => {
        if (cantidad < stock) {
            setCantidad(prevQuantity => prevQuantity + 1)
            startAddProductInCart(_id)
        }
    }

    const handleDisminuirQuantity = () => {
        if (cantidad > 1) {
            setCantidad(prevQuantity => prevQuantity - 1)
            startRemoveProductInCart(_id)
        }
    }

    const handleDelete = () => startDeleteProductInCart(_id)

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center border-bottom py-2">
                <div className="d-flex align-items-center">
                    <img src={thumbnail} alt={title} className="me-3" style={{ maxWidth: '50px' }} />
                    <div>
                        <h6 className="mb-0">{title}</h6>
                        <p className="mb-0">Precio: ${price}</p>
                        <p className="mb-0">Cantidad: {cantidad}</p>
                        <p className="mb-0">Total: ${price * cantidad}</p>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <IconButton aria-label="remove" onClick={handleDisminuirQuantity}><Remove /></IconButton>
                    <IconButton aria-label="add" onClick={handleAumentarQuantity}><Add /></IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(_id)}><Delete /></IconButton>
                </div>
            </div>
        </div>
    )
}