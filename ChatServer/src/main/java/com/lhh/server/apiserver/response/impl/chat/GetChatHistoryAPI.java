/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.chat;

import com.lhh.dao.impl.chat.ChatLogDAO;
import com.lhh.dao.impl.file.FileDAO;
import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.server.apiserver.response.common.ListEntityRespond;
import com.lhh.server.entity.impl.Message;
import com.lhh.server.entity.impl.User;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Linh
 */
public class GetChatHistoryAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        ListEntityRespond response = new ListEntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String conversationId = request.getStringParam(ParamKey.CONVERSATION_ID);
            String timeStamp = request.getStringParam(ParamKey.TIME_STAMP);
            Integer take = request.getIntegerParam(ParamKey.TAKE);

            List<Message> lstMessage = ChatLogDAO.getChatHistory(conversationId, timeStamp, take);
            List<String> lstUserId = new ArrayList<>();
            List<String> lstFileId = new ArrayList<>();
            for (Message msg : lstMessage) {
                if (!lstUserId.contains(msg.from)) {
                    lstUserId.add(msg.from);
                }
                if (msg.type == Message.MessageType.FILE) {
                    lstFileId.add(msg.value);
                }
            }
            Map<String, User> mapUserInfo = UserDAO.getMapBasicInfo(lstUserId);
            for (User user : mapUserInfo.values()) {
                if (user.avatarId != null && !user.avatarId.isEmpty()) {
                    lstFileId.add(user.avatarId);
                }
            }
            Map<String, String> mapFilUrl = FileDAO.getListFileURL(lstFileId);
            for (Message msg : lstMessage) {
                msg.isOwned = userId.equals(msg.from);
                if (msg.type == Message.MessageType.FILE) {
                    msg.value = mapFilUrl.get(msg.value);
                }
                User friend = mapUserInfo.get(msg.from);
                if (friend != null) {
                    friend.avatarUrl = mapFilUrl.get(friend.avatarId);
                    msg.fromInfo = friend.toJsonObject();
                }
            }

            response.data = lstMessage;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return response;
    }

}
