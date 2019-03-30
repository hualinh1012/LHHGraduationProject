import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_USER_INFO } from '../../types';

const get_user_info_action = () => {
    var token = localStorage.getItem('token');
    
    const data = {
        'api': 'get_user_info',
        'token': JSON.parse(token)
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

export { get_user_info_action };