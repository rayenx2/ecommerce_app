const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'http://localhost:1337/api';

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
});

const getLatestProducts = () => axiosClient.get('/products?populate=*');
const getProductById = (id) => axiosClient.get('/products/' + id + '?populate=*');
const getProductByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);
const AddToCart = (data) => axiosClient.post('/carts', data);
const GetUserCartItem = (email) => axiosClient.get('/carts?populate[products][populate][0]=image&filters[email][$eq]='+email);
const deleteCartItem = (id) => axiosClient.delete('/carts/' + id);
const createOrder= (data)=>axiosClient.post('/orders',data )


const GlobalApi = {
    getLatestProducts,
    getProductById,
    getProductByCategory,
    AddToCart,
    GetUserCartItem,
    deleteCartItem,
    createOrder
};

export default GlobalApi;
