import axios from 'axios';
import { SERVER_API } from '../../constant';
import { ADD_FRIEND_TO_CONVERSATION } from '../../types';

const add_friend_to_conversation_action = (conversationId, lstFriendId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'add_friend_to_conversation',
        'token': JSON.parse(token),
        'conversation_id': conversationId,
        'lst_friend_id': lstFriendId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: ADD_FRIEND_TO_CONVERSATION,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: ADD_FRIEND_TO_CONVERSATION,
            payload: {}
        };
    });
}

export { add_friend_to_conversation_action };