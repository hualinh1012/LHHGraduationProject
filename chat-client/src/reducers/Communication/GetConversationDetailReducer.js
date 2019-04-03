import { GET_CONVERSATION_DETAIL } from '../../types';

const get_conversation_detail_reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CONVERSATION_DETAIL:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

export {
    get_conversation_detail_reducer
}