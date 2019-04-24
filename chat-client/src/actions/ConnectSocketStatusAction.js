import { CONNECT_SOCKET_STATUS } from '../types';

const connect_socket_status_action = (is_success) => {
    const data = {
        'is_success': is_success
    }

    return {
        type: CONNECT_SOCKET_STATUS,
        payload: data
    };
}

export { connect_socket_status_action };