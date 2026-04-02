import axios from 'axios';

// Create a custom instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Product Endpoints ---
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);

// --- Cart/Order Endpoints (For future use) ---
export const placeOrder = (orderData) => API.post('/orders', orderData);

export default API;