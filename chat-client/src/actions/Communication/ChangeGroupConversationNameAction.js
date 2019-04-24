import axios from 'axios';
import { SERVER_API } from '../../constant';
import { CHANGE_GROUP_CONVERSATION_NAME } from '../../types';

const change_group_conversation_name_action = (conversationId, conversationName) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'change_group_conversation_name',
        'token': JSON.parse(token),
        'conversation_id': conversationId,
        'conversation_name': conversationName
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: CHANGE_GROUP_CONVERSATION_NAME,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: CHANGE_GROUP_CONVERSATION_NAME,
            payload: {}
        };
    });
}

export { change_group_conversation_name_action };