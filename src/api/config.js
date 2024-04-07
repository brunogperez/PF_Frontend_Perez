import axios from 'axios'
import { getVarEnv } from '../helpers/getVarEnv'

const { VITE_URL_API } = getVarEnv()


const ecommerceURL = VITE_URL_API

const ecommerceApi = axios.create({
    baseURL: ecommerceURL
})

ecommerceApi.interceptors.request.use(config=>{
    config.headers = {
        'x-token': localStorage.getItem('token'),
    }
    return config;
})

export default ecommerceApi