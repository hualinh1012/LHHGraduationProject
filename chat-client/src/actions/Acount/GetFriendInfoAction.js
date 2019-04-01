import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_FRIEND_INFO } from '../../types';

const get_friend_info_action = (friend_id) => {
    var token = localStorage.getItem('token');
    
    const data = {
        'api': 'get_user_info',
        'token': JSON.parse(token),
        'friend_id': friend_id
    }
    
    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_FRIEND_INFO,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_FRIEND_INFO,
            payload: {}
        };
    });
}

export { get_friend_info_action };