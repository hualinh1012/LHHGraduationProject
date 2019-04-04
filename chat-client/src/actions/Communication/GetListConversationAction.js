import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_LIST_CONVERSATION } from '../../types';

const get_list_conversation_action = () => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'get_list_conversation',
        'token': JSON.parse(token),
        'skip': 0,
        'take': 20
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_LIST_CONVERSATION,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_LIST_CONVERSATION,
            payload: {}
        };
    });
}

export { get_list_conversation_action };