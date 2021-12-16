import axios from 'axios'

const $api = axios.create({
    baseURL:'http://127.0.0.1:3000/api/v1'
})

$api.interceptors.request.use(config=>{


    const token = window.localStorage.getItem('token')
    //  如果localStorage当中有token 那么就在请求头当中自动加上token
    if(token) config.headers.authorization = token

    return config

})

export  default  $api;
