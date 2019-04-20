import { LOAD_MORE_HISTORY, CLEAR_STORE } from '../../types';

const load_more_chat_history_reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MORE_HISTORY:
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
    load_more_chat_history_reducer
}