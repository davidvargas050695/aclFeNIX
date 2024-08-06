import axios from 'axios';

// Crea una instancia de Axios
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_FENIX_URL, // URL base para todas las solicitudes
});

// Agrega un interceptor de solicitudes
apiClient.interceptors.request.use(
    config => {
        const token = 'ce3a598687c8d2e5aa6bedad20e059b4a78cca0adad7e563b07998d5cd226b8c'; // O cualquier otro lugar donde almacenes el token
        // const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Configura el Content-Type para todas las solicitudes como JSON
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;
