/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.chat;

import com.lhh.dao.impl.file.FileDAO;
import com.lhh.dao.impl.user.ConversationDAO;
import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.ListEntityRespond;
import com.lhh.server.entity.impl.User;
import com.lhh.util.Util;
import com.lhh.util.constant.Constant;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Linh
 */
public class GetListConversationAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        ListEntityRespond response = new ListEntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            Integer skip = request.getIntegerParam(ParamKey.SKIP);
            Integer take = request.getIntegerParam(ParamKey.TAKE);
            List<Conversation> lstConversation = ConversationDAO.getListConversation(userId, skip, take);
            List<String> lstAvaId = new ArrayList<>();
            for (Conversation conversation : lstConversation) {
                if (conversation != null && conversation.conversationType == Constant.ConversationType.PRIVATE) {
                    String friendId = conversation.lstUser.get(0);
                    friendId = friendId.equals(userId) ? conversation.lstUser.get(1) : friendId;
                    User friend = UserDAO.getUserInfo(friendId);
                    conversation.conversationName = friend.userName;
                    conversation.avatarId = friend.avatarId;
                    lstAvaId.add(friend.avatarId);
                }
            }
            Map<String, String> mapAvatar = FileDAO.getListFileURL(lstAvaId);
            for (Conversation conversation : lstConversation) {
                if (conversation.avatarId != null) {
                    conversation.avatarUrl = mapAvatar.get(conversation.avatarId);
                }
            }
            response.data = lstConversation;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return response;
    }
}
