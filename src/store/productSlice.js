import { createSlice } from '@reduxjs/toolkit'


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        products: null,
        pagination: null,
    },
    reducers: {
        onProduct: (state, { payload }) => {
            state.product = payload
        },
        onProducts: (state, { payload }) => {
            state.products = payload
        },
        onPagination: (state, { payload }) => {
            state.pagination = payload
        },
        onResetProduct: (state) => {
            state.pagination = null
            state.product = null
            state.products = null
        },
        onDeleteProduct: (state, { payload }) => {
            state.products = state.products.filter(product => product._id !== payload)
        },
        onUpdateProduct: (state, { payload }) => {
            state.products = state.products.map(product => {
                if (product._id === payload._id) return payload
                return product
            })
        },
    },
})

export const { onProduct, onProducts, onPagination, onResetProduct, onDeleteProduct, onUpdateProduct } = productSlice.actions