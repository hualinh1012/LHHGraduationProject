import { LOAD_CONVERSATION } from '../../types';

const load_conversation_reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CONVERSATION:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

export {
    load_conversation_reducer
}