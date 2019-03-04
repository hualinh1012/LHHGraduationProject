import axios from 'axios';
import { SERVER_API } from '../../constant';
import { LOGIN } from '../../types';

const login_action = (email, password) => {

    const data = {
        'api': 'login',
        'email': email,
        'password': password
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        const result = res.data;

        if (result.code === 0) {
            localStorage.setItem('token', JSON.stringify(result.data.token));
        }

        return {
            type: LOGIN,
            payload: data
        };
    })
}

export { login_action };