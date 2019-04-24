import { START_CALL, CLEAR_STORE } from '../../types';

const start_call_reducer = (state = {}, action) => {
    switch (action.type) {
        case START_CALL:
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
    start_call_reducer
}