import { CHANGE_GROUP_CONVERSATION_NAME, CLEAR_STORE } from '../../types';

const change_group_name_reducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_GROUP_CONVERSATION_NAME:
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
    change_group_name_reducer
}