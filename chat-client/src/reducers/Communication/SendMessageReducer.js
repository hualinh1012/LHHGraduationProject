import { SEND_MESSAGE, CLEAR_STORE } from '../../types';

const send_message_reducer = (state = {}, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
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
    send_message_reducer
}