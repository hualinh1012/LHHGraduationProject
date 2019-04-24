/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.chat;

import com.lhh.dao.impl.file.FileDAO;
import com.lhh.dao.impl.user.ConversationDAO;
import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.server.entity.impl.User;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Linh Hua
 */
public class ChangeConversationNameAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String conversationId = request.getStringParam(ParamKey.CONVERSATION_ID);
            String conversationName = request.getStringParam(ParamKey.CONVERSATION_NAME);
            if (conversationId == null || conversationId.isEmpty()) {
                response.code = ResponseCode.WRONG_DATA_FORMAT;
                return response;
            }

            boolean isUpdate = ConversationDAO.updateConversationName(userId, conversationId, conversationName);
            if (isUpdate) {          
                response.data = new Conversation(conversationId, conversationName);
                response.code = ResponseCode.SUCCESS;
            }
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }

}
