import axios from 'axios';


export const userData = async () => {

    try {
        
        const response = await axios.get('http://localhost:4000/server/auth/user/profile', {
            withCredentials: true, 
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
   
}

