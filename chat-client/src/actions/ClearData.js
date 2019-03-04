import { CLEAR_STORE } from '../types';

/**
 * CLEAR_STORE
 * @dev_2018
 */
const clear_data = () => {
	return {
		type: CLEAR_STORE,
		payload: false
	};
};

export { clear_data };
