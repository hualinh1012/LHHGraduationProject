import { CREATE_CONVERSATION, CLEAR_STORE } from '../../types';

const create_conversation_reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CONVERSATION:
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
    create_conversation_reducer
}