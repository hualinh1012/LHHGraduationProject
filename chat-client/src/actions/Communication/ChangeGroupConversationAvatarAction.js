import axios from 'axios';
import { SERVER_API } from '../../constant';
import { CHANGE_GROUP_CONVERSATION_AVATAR } from '../../types';

const change_group_conversation_avatar_action = (conversationId, avatarId) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'change_group_conversation_avatar',
        'token': JSON.parse(token),
        'conversation_id': conversationId,
        'avatar_id': avatarId
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: CHANGE_GROUP_CONVERSATION_AVATAR,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: CHANGE_GROUP_CONVERSATION_AVATAR,
            payload: {}
        };
    });
}

export { change_group_conversation_avatar_action };