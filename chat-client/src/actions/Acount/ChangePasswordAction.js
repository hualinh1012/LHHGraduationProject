import axios from 'axios';
import { SERVER_API } from '../../constant';
import { CHANGE_PASSWORD } from '../../types';

const change_password_action = (new_pwd, old_pwd) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'change_password',
        'token': JSON.parse(token),
        'new_pwd': new_pwd,
        'old_pwd':old_pwd
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: CHANGE_PASSWORD,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: CHANGE_PASSWORD,
            payload: {}
        };
    });
}

export { change_password_action };