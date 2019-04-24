import { GET_GROUP_CONVERSATION, CLEAR_STORE } from '../../types';

const get_group_conversation_detail_reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GROUP_CONVERSATION:
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
    get_group_conversation_detail_reducer
}