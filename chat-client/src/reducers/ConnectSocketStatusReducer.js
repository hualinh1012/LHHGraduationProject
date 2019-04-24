import { CLEAR_STORE, CONNECT_SOCKET_STATUS } from '../types';

const connect_socket_status_reducer = (state = {}, action) => {
    switch (action.type) {
        case CONNECT_SOCKET_STATUS:
            return {
                ...state,
                data: action.payload
            };
        case CLEAR_STORE:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

export {
    connect_socket_status_reducer
}