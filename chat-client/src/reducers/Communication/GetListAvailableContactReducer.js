import { GET_LIST_AVAILABLE_CONTACT, CLEAR_STORE } from '../../types';

const get_list_available_contact_reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_AVAILABLE_CONTACT:
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
    get_list_available_contact_reducer
}