import { CLEAR_STORE, CONNECT_SOCKET } from '../types';

const connect_socket_reducer = (state = {}, action) => {
    switch (action.type) {
        case CONNECT_SOCKET:
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
    connect_socket_reducer
}