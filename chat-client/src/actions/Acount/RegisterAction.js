import axios from 'axios';
import { SERVER_API } from '../../constant';
import { REGISTER } from '../../types';

const register_action = (email, username, dob, gender, password) => {
    console.log(password)
    const data = {
        'api': 'register',
        'email': email,
        'user_name': username,
        'gender': gender,
        'dob':dob,
        'pwd': password
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        const result = res.data;

        if (result.code === 0) {
            localStorage.setItem('token', JSON.stringify(result.data.token));
            localStorage.setItem('user_id', JSON.stringify(result.data.user_id));
        }

        return {
            type: REGISTER,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: REGISTER,
            payload: {}
        };
    });
}

export { register_action };