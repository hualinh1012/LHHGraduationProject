import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_CHAT_HISTORY } from '../../types';

const get_chat_history_action = (conversation_id, time, take) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'get_chat_history',
        'token': JSON.parse(token),
        'conversation_id': conversation_id,
        'time_stamp': time,
        'take': take
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_CHAT_HISTORY,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_CHAT_HISTORY,
            payload: {}
        };
    });
}

export { get_chat_history_action };