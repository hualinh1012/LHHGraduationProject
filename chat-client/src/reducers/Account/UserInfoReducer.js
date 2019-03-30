import { GET_USER_INFO } from '../../types';

const user_info_reducer = (state = {}, action) => {
	switch (action.type) {
		case GET_USER_INFO:
			return {
				...state,
				data: action.payload
			};

		default:
			return state;
	}
}

export {
	user_info_reducer
}