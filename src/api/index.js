//localStorage.setItem("formInfo",JSON.stringify(row))
/**
 * Created by bootdo.
 */
import Env from './env'
import axios from 'axios'
import store from "@/store";
// import {
//     bus
// } from '../bus.js'
/* eslint-disable */
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'// 配置请求头

// 基地址
let base = Env.baseURL

// 通用方法
export const POST = (url, params) => {
    axios.defaults.headers.common['token'] = store.getters.getTokens.idToken.jwtToken
    return axios.post(`${base}${url}`, params).then(res=>res.data)
}

export const GET = (url, params) => {
    return axios.get(`${base}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}

export const EXPORT = (url, params) => {
    return axios.post(`${base}${url}`, params, {
        responseType: 'blob'
    }).then(res => res.data)
}
export default {
}

