/**
|--------------------------------------------------
| ALL REDUCERS
|--------------------------------------------------
*/
import { combineReducers } from 'redux';

import {user_login_reducer} from './Account/LoginReducer';
import {user_register_reducer} from './Account/RegisterReducer';

const reducer = combineReducers({
    user_login_reducer,
    user_register_reducer
});

export default reducer;