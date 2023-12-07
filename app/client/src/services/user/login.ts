import axios from 'axios';
import Swal from 'sweetalert2';

import { LoginCredentials } from '../../lib/types/User';


const showErrorNotification = (message: any) => {
    
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

export const Login = async (userData: LoginCredentials) => {

    try {
        
        const response = await axios.post('https://fitplanner-server.onrender.com/auth/login', userData, {
            withCredentials: false, 
        });

        console.log('response', response.data)

        return response.data;
        
    } catch (error: any) {

        if (error.response) {

            if (typeof error.response.data.message === 'string') return showErrorNotification(error.response.data.message);
            
            showErrorNotification(error.response.data.message[0]);
           
        }

        console.error(error);
        throw error;
    }

}