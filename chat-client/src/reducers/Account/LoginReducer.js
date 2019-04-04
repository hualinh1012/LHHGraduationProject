import { LOGIN, CLEAR_STORE } from '../../types';

const user_login_reducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
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
	user_login_reducer
}