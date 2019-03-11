import {REGISTER} from '../../types';

const user_register_reducer = (state = {}, action) => {
	switch (action.type) {
        case REGISTER:
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