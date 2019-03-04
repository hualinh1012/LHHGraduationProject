import {LOGIN} from '../../types';

const user_login_reducer = (state = {}, action) => {
	switch (action.type) {
        case LOGIN:
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