import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'session',
    initialState: {
        users: [],
        _id: null,
        first_name: null,
        last_name: null,
        email: null,
        role: null,
        cart_id: null,
        status: 'checking',
        isAdmin: false,
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state._id = payload._id
            state.first_name = payload.first_name
            state.last_name = payload.last_name
            state.email = payload.email
            state.role = payload.role
            state.cart_id = payload.cart_id
            state.isAdmin = payload.role === 'admin' ? true : false
        },
        onLogout: (state) => {
            state.status = 'not-authenticated'
            state._id = null
            state.first_name = null
            state.last_name = null
            state.email = null
            state.role = null
            state.cart_id = null
            state.isAdmin = false
        },
        onCheckingLogin: (state) => {
            state.status = 'checking'
            state._id = null
            state.first_name = null
            state.last_name = null
            state.email = null
            state.role = null
            state.cart_id = null
            state.isAdmin = false
        },
        onGetUsers: (state, { payload }) => {
            state.users = payload
            state.status = 'authenticated'
        },
        onDeleteUsers: (state, { payload }) => {
            state.users = payload
            //state.users = state.users.filter(user => user._id !== payload)
        },
    },
})

export const { onLogin, onLogout, onCheckingLogin, onGetUsers, onDeleteUsers } = authSlice.actions