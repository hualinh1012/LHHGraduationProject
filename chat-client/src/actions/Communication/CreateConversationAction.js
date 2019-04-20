import axios from 'axios';
import { SERVER_API } from '../../constant';
import { CREATE_CONVERSATION } from '../../types';

const create_conversation_action = (list_friend) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'create_conversation',
        'token': JSON.parse(token),
        'lst_friend_id': list_friend
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: CREATE_CONVERSATION,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: CREATE_CONVERSATION,
            payload: {}
        };
    });
}

export { create_conversation_action };