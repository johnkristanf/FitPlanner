import axios from 'axios';


export const userData = async () => {

    try {
        
        const response = await axios.get('https://fitplanner-server.onrender.com/auth/user/profile', {
            baseURL: 'https://fitplanner-server.onrender.com',
            withCredentials: true, 
        });

        console.log('response', response)

        return response.data;

    } catch (error) {
        console.error(error);
    }
   
}

