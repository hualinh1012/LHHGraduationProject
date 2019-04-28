import { RECEIVE_CALL_SIGNAL, CLEAR_STORE } from '../../types';

const receive_call_signal_reducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CALL_SIGNAL:
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
    receive_call_signal_reducer
}