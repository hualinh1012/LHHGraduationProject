import { START_CONVERSATION, CLEAR_STORE } from '../../types';

const start_conversation_reducer = (state = {}, action) => {
    switch (action.type) {
        case START_CONVERSATION:
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
    start_conversation_reducer
}