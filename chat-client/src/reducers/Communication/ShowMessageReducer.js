import { SHOW_MESSAGE, CLEAR_STORE } from '../../types';

const show_message_reducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
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
    show_message_reducer
}