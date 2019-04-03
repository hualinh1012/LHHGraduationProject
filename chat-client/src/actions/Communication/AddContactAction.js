import axios from 'axios';
import { SERVER_API } from '../../constant';
import { ADD_CONTACT } from '../../types';

const add_contact_action = (friendId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'add_contact',
        'token': JSON.parse(token),
        'friend_id': friendId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: ADD_CONTACT,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: ADD_CONTACT,
            payload: {}
        };
    });
}

export { add_contact_action };