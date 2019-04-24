import { SEND_MESSAGE } from '../../types';

const send_message_action = (msg_id, to, msg_type, msg_content) => {
    var user_id = localStorage.getItem('user_id');

    const data = {
        'msg_id': msg_id,
        'from': JSON.parse(user_id),
        'to': to,
        'type': msg_type,
        'value': msg_content
    }

    return {
        type: SEND_MESSAGE,
        payload: data
    };
}

export { send_message_action };