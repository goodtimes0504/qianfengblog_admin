const baseURL = 'http://localhost:3000'
const http = axios.create({
    baseURL,
    timeout: 10000,
})
//请求拦截器
http.interceptors.request.use(config => {
    //在请求头中添加token
    // console.log(config.headers);
    // console.log(localStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // console.log(config.headers.Authorization);
    return config
}, err => {
    return Promise.reject(err)
})