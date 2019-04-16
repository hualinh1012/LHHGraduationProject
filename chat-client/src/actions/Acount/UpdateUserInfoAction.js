import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_USER_INFO } from '../../types';

const update_user_info_action = (username, dob, gender, phone_number, avatar_id) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'upd_user_info',
        'token': JSON.parse(token),
        'user_name': username,
        'gender': gender,
        'dob':dob,
        'phone_number': phone_number,
        'avatar_id' : avatar_id
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_USER_INFO,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_USER_INFO,
            payload: {}
        };
    });
}

export { update_user_info_action };