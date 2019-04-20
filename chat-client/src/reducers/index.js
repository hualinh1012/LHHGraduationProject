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
import {friend_info_reducer} from './Account/FriendInfoReducer';
import {start_conversation_reducer} from './Communication/StartConversationReducer';
import {load_conversation_reducer} from './Communication/LoadConversationReducer';
import {get_conversation_detail_reducer} from './Communication/GetConversationDetailReducer';
import {send_message_reducer} from './Communication/SendMessageReducer';
import {list_conversation_reducer} from './Communication/ListConversationReducer';
import {get_chat_history_reducer} from './Communication/GetChatHistoryReducer';
import {show_message_reducer} from './Communication/ShowMessageReducer';
import {load_more_chat_history_reducer} from './Communication/LoadMoreHistoryReducer';
import {get_list_available_contact_reducer} from './Communication/GetListAvailableContactReducer';
import {create_conversation_reducer} from './Communication/CreateConversationReducer';

const reducer = combineReducers({
    user_login_reducer,
    user_register_reducer,
    user_info_reducer,
    change_password_reducer,
    list_contact_reducer,
    friend_info_reducer,
    start_conversation_reducer,
    load_conversation_reducer,
    get_conversation_detail_reducer,
    send_message_reducer,
    list_conversation_reducer,
    get_chat_history_reducer,
    show_message_reducer,
    load_more_chat_history_reducer,
    get_list_available_contact_reducer,
    create_conversation_reducer
});

export default reducer;