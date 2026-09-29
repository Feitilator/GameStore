import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
}) 

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) =>{
        if (error.response?.status === 401) {
            console.log('Ошибка 401')
        } else {
            console.error(
                "API error:",
                error.response?.data || error.message
            )
        }
        
        return Promise.reject(error)
    }
)

export default api