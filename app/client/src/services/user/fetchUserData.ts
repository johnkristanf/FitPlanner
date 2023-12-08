

export const userData = async () => {

    try {

        const response = await fetch('https://fitplanner-server.onrender.com/auth/user/profile');

        console.log('response', response)

        if(response.ok) return response.json();

    } catch (error) {
        console.error(error);
    }
   
}

