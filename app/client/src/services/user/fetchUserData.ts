import axios from 'axios';


export const userData = async () => {

    try {

        const axiosInstance = axios.create({
            baseURL: 'https://fitplanner-server.onrender.com', 
            withCredentials: true, 
        });
        
        const response = await axiosInstance.get('/auth/user/profile');

        console.log('response', response)

        return response.data;

    } catch (error) {
        console.error(error);
    }
   
}

