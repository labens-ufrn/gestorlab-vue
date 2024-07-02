import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/gestorlab',
  // outras configurações do Axios
});

export default axiosInstance;