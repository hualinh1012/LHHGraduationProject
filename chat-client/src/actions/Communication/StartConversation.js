import axios from 'axios';
import { SERVER_API } from '../../constant';
import { START_CONVERSATION } from '../../types';

const start_conversation_action = (friendId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'start_conversation',
        'token': JSON.parse(token),
        'friend_id': friendId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: START_CONVERSATION,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: START_CONVERSATION,
            payload: {}
        };
    });
}

export { start_conversation_action };