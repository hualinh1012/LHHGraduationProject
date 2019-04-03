import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_CONVERSATION_DETAIL } from '../../types';

const get_conversation_detail_action = (conversationId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'get_conversation_detail',
        'token': JSON.parse(token),
        'conversation_id': conversationId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_CONVERSATION_DETAIL,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_CONVERSATION_DETAIL,
            payload: {}
        };
    });
}

export { get_conversation_detail_action };