import { GET_FRIEND_INFO } from '../../types';

const friend_info_reducer = (state = {}, action) => {
	switch (action.type) {
		case GET_FRIEND_INFO:
			return {
				...state,
				data: action.payload
			};

		default:
			return state;
	}
}

export {
	friend_info_reducer
}