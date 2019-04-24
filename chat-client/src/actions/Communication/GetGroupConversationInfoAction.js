import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_GROUP_CONVERSATION } from '../../types';

const get_group_conversation_detail_action = (conversationId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'get_group_conversation_detail',
        'token': JSON.parse(token),
        'conversation_id': conversationId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_GROUP_CONVERSATION,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_GROUP_CONVERSATION,
            payload: {}
        };
    });
}

export { get_group_conversation_detail_action };