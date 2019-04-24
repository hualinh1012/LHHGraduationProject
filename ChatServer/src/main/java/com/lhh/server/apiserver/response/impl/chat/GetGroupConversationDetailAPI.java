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
public class GetGroupConversationDetailAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String conversationId = request.getStringParam(ParamKey.CONVERSATION_ID);
            if (conversationId == null || conversationId.isEmpty()) {
                response.code = ResponseCode.WRONG_DATA_FORMAT;
                return response;
            }

            Conversation conversation = ConversationDAO.getGroupConversationDetail(userId, conversationId);
            if (conversation != null) {
                conversation.lstUser = UserDAO.getUserInfo(conversation.lstUserId);
                List<String> lstAvaId = new ArrayList<>();
                for (User user : conversation.lstUser){
                    if (user.avatarId != null && !user.avatarId.isEmpty()){
                        lstAvaId.add(user.avatarId);
                    }
                }
                Map<String, String> mapAva = FileDAO.getListFileURL(lstAvaId);
                for (User user : conversation.lstUser){
                    if (user.avatarId != null && !user.avatarId.isEmpty()){
                        user.avatarUrl = mapAva.get(user.avatarId);
                    }
                }
                response.data = conversation;
                response.code = ResponseCode.SUCCESS;
            }
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }

}
