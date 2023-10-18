import axios from 'axios'
const API_ROOT = 'http://localhost:8017'
export const fetchUserDetails = async (username, password) => {
    const req = await axios.get(`${API_ROOT}/v1/users/${username}/${password}`)
    return req.data
}
export const createNewUsers = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/users`, data)
    return req.data
}
export const fetchBestLaptop = async () => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollectingCustomer/`)
    return req.data
}
export const fetchProductCollection = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/searchCustomer/search`, { params: {...data, count:countPage }})
    return req.data
}
export const fetchCartUser = async (email,token) => {
    const req = await axios.get(`${API_ROOT}/v1/cartCustomer/${email}`,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const fetchSyncUser = async (token) => {
    const req = await axios.get(`${API_ROOT}/v1/syncUser/syncUser`,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const updateUser = async (id, data, token) => {
    const req = await axios.put(`${API_ROOT}/v1/users/${id}`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const updatePasswordUser = async (id, data, token) => {
    const req = await axios.put(`${API_ROOT}/v1/users/updatePassword/${id}`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const fetchUserOrderDetails = async (username,token) => {
    const req = await axios.get(`${API_ROOT}/v1/users/${username}`,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const updateCart = async (email, data, token) => {
    const req = await axios.put(`${API_ROOT}/v1/cartCustomer/${email}`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const createOrderByCustomer = async (data, token) => {
    const req = await axios.post(`${API_ROOT}/v1/orderUser`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const fetchOrderInformation = async (id, token) => {
    const req = await axios.get(`${API_ROOT}/v1/orderUser/${id}`,{ headers: { 'auth-token-user': token }})
    return req.data
}





export const fetchCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/collecting`)
    return req.data
}

export const fetchSearchProduct = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/searchGoods/searchGoods`, { params: {...data}})
    return req.data
}
export const fetchFilterProduct = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/searchGoods/filterGoods`, { params: {...data}})
    return req.data
}

export const fetchGoodsByName = async (id, data) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollectingCustomer/${id}`, {params : {nameCollection: data}})
    return req.data
}


// export const fetchSearchLaptopCollecting = async (data, countPage) => {
//     const req = await axios.get(`${API_ROOT}/v1/laptopCollectingCustomer/search`, { params: {...data, count:countPage }})
//     return req.data
// }

export const fetchCancelOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderUser/${id}`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}
export const fetchRatingOrder = async (id,data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderUser/ratingOrder/${id}`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}

export const fetchChat = async (data) => {
    const req = await axios.put(`${API_ROOT}/v1/chat`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}

export const fetchReply = async (data) => {
    const req = await axios.put(`${API_ROOT}/v1/chat/reply`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}

export const fetchDeleteReply = async (data) => {
    const req = await axios.put(`${API_ROOT}/v1/chat/deleteReply`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}

export const fetchDeleteComment = async (data) => {
    const req = await axios.put(`${API_ROOT}/v1/chat/deleteComment`, data,{ headers: { 'auth-token-user': token }})
    return req.data
}