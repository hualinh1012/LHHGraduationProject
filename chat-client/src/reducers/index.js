/**
|--------------------------------------------------
| ALL REDUCERS
|--------------------------------------------------
*/
import { combineReducers } from 'redux';

import {user_login_reducer} from './Account/LoginReducer';
import {user_register_reducer} from './Account/RegisterReducer';
import {user_info_reducer} from './Account/UserInfoReducer';
import {change_password_reducer} from './Account/ChangePassReducer';
import {list_contact_reducer} from './Communication/ListContactReducer';

const reducer = combineReducers({
    user_login_reducer,
    user_register_reducer,
    user_info_reducer,
    change_password_reducer,
    list_contact_reducer
});

export default reducer;