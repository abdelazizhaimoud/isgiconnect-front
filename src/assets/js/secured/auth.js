import axiosClient from '../api/getUser'
import { useDispatch } from 'react-redux';
import { set_user } from '../components/New/Store/actions'


// accept dispatch as a parameter
const auth = async (dispatch) => {
    const localToken = localStorage.getItem('token')
    if(!localToken) return null // Return null if no token
    
    try {
        console.log(localToken);
        // Then get the CSRF cookie
        await axiosClient.get("/sanctum/csrf-cookie");
        // Make the authenticated request
        const response = await axiosClient.get('/api/user');
                
        if (response.data.user) {
            console.log(response)
            const { user, user_type } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('user_type', user_type);
            // Use the passed dispatch function
            if (dispatch) {
                dispatch(set_user(user));
            }
            return user; // Return the user object
        }

        return null; // Return null if no user data
    } catch (error) {
        console.error('Authentication error:', error);
        return null; 
    }
}

export default auth
