import axios from 'axios'

const ecommerceApi = axios.create({
    //baseURL: 'https://pfbackendperez.onrender.com/api'
    baseURL: 'http://127.0.0.1:8080/api'
});

ecommerceApi.interceptors.request.use(config=>{
    config.headers = {
        'x-token': localStorage.getItem('token'),
    }
    return config;
})

export default ecommerceApi