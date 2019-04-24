/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.chat;

import com.lhh.dao.impl.user.ConversationDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.List;

/**
 *
 * @author Linh Hua
 */
public class AddFriendToConversationAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String conversationId = request.getStringParam(ParamKey.CONVERSATION_ID);
            List<String> lstFriendId = request.getListStringParam(ParamKey.LIST_FRIEND_ID);
            if (lstFriendId != null && !lstFriendId.isEmpty()) {
                ConversationDAO.addFriend(userId, conversationId, lstFriendId);
                response.code = ResponseCode.SUCCESS;
            }
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return response;
    }
}
