import axios from 'axios';
import Swal from 'sweetalert2';

import { SignupCredentials } from '../../lib/types/User';

export const Signup = async (userData: SignupCredentials) => {

    try {
        
        const response = await axios.post('http://localhost:4000/server/auth/signup', userData, {
            withCredentials: true, 
        });

        console.log('response', response.data)

        return response.data;
        
    } catch (error: any) {

        if (error.response) {
            console.log(error.response.data.message);

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message[0],
                showConfirmButton: false,
                timer: 1500
            });

        }

        console.error(error);
        throw error;
    }

}