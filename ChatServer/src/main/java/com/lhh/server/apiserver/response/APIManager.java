/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response;

import com.lhh.server.apiserver.response.impl.account.*;
import com.lhh.server.apiserver.response.impl.activities.*;
import com.lhh.server.apiserver.response.impl.chat.*;
import com.lhh.server.apiserver.response.impl.upload.*;
import com.lhh.util.constant.API;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

/**
 *
 * @author RuAc0n
 */
public class APIManager {

    private static final TreeMap<String, IApiAdapter> m = new TreeMap<>();
    private static final List<String> n = new ArrayList<>();

    //init api
    static {                
        m.put(API.REGISTER, new RegisterAPI());
        m.put(API.LOGIN, new LoginAPI());
        m.put(API.GET_USER_INFO, new GetUserInfoAPI());
        m.put(API.UPDATE_USER_INFO, new UpdateUserInfoAPI());
        m.put(API.CHANGE_PASSWORD, new ChangePasswordAPI());
        
        m.put(API.SEARCH_CONTACT, new SearchContactAPI());
        m.put(API.GET_LIST_CONTACT, new GetListContact());
        m.put(API.ADD_CONTACT, new AddContactAPI());
        
        m.put(API.START_CONVERSATION, new StartConversationAPI());
        m.put(API.GET_CONVERSATION_DETAIL, new GetConversationDetailAPI());        
        m.put(API.GET_LIST_CONVERSATION, new GetListConversationAPI());
        
        m.put(API.GET_CHAT_HISTORY, new GetChatHistoryAPI());
        
        m.put(API.UPLOAD_AVATAR, new UploadAvatarAPI());
        m.put(API.UPLOAD_FILE, new UploadFileAPI());
        m.put(API.GET_LIST_AVAILABLE_CONTACT, new GetListAvailableContactAPI());
        m.put(API.CREATE_CONVERSATION, new CreateConversationAPI());
    }
    
    //init list non-token api
    static {
        n.add(API.REGISTER);
        n.add(API.LOGIN);
    }

    public static IApiAdapter getApi(String apiName) {
        return m.get(apiName);
    }

    public static boolean isNonTokenApi(String apiName) {
        return n.contains(apiName);
    }
}
