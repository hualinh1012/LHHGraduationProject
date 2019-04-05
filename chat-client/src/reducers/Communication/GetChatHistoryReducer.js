import { GET_CHAT_HISTORY, CLEAR_STORE } from '../../types';

const get_chat_history_reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CHAT_HISTORY:
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
    get_chat_history_reducer
}