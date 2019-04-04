import { CHANGE_PASSWORD, CLEAR_STORE } from '../../types';

const change_password_reducer = (state = {}, action) => {
	switch (action.type) {
		case CHANGE_PASSWORD:
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
	change_password_reducer
}