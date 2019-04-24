import { CONNECT_SOCKET } from '../types';

const set_connect_socket_status_action = (is_connect) => {
    const data = {
        'connect': is_connect
    }

    return {
        type: CONNECT_SOCKET,
        payload: data
    };
}

export { set_connect_socket_status_action };