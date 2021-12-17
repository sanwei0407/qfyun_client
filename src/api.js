import axios from 'axios'

const $api = axios.create({
    baseURL:'http://127.0.0.1:3000/api/v1'
})

// 请求拦截 表示在最后发送请求的时候 还可以对请求的内容进行一定程度上的 包装
$api.interceptors.request.use(config=>{

    const token = window.localStorage.getItem('token')
    //  如果localStorage当中有token 那么就在请求头当中自动加上token
    if(token) config.headers.authorization = token  // 以便api接口可以获得用户信息

    return config

})

export  default  $api;
