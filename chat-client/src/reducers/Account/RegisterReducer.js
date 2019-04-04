import { REGISTER, CLEAR_STORE } from '../../types';

const user_register_reducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER:
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
	user_register_reducer
}