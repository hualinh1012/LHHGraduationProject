import { GET_LIST_CONVERSATION, CLEAR_STORE } from '../../types';

const list_conversation_reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_CONVERSATION:
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
    list_conversation_reducer
}