import axios from 'axios';


export const userData = async () => {

    try {
        
        const response = await axios.get('https://fitplanner-server.onrender.com/auth/user/profile', {
            withCredentials: true, 
        });

        console.log('response', response)

        return response.data;

    } catch (error) {
        console.error(error);
    }
   
}

