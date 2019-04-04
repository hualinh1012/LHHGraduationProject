import { SEARCH_CONTACT, GET_LIST_CONTACT, CLEAR_STORE } from '../../types';

const list_contact_reducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_CONTACT:
            return {
                ...state,
                data: action.payload
            };
        case GET_LIST_CONTACT:
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
    list_contact_reducer
}