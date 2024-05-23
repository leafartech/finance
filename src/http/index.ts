import axios from 'axios'
import { parseCookies } from 'nookies'

const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use((config) => {
    //Fazer alguma coisa com a request
    const token = parseCookies().GF

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {

    //Fazer alguma coisa com o erro
    console.log(error)
    return Promise.reject(error)
})

export default http