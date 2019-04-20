import axios from 'axios';
import { SERVER_API } from '../../constant';
import { LOAD_MORE_HISTORY } from '../../types';

const load_more_history = (conversation_id, time, take) => {
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
            type: LOAD_MORE_HISTORY,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: LOAD_MORE_HISTORY,
            payload: {}
        };
    });
}

export { load_more_history };