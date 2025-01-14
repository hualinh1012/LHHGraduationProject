/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.account;

import com.lhh.dao.impl.file.FileDAO;
import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.entity.impl.User;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;

/**
 *
 * @author Linh
 */
public class GetUserInfoAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String friendId = request.getStringParam(ParamKey.FRIEND_ID);
            User user;
            if (friendId != null) {
                user = UserDAO.getUserInfo(friendId);
            } else {
                user = UserDAO.getUserInfo(userId);
            }
            if (user.avatarId != null){
                user.avatarUrl = FileDAO.getFileUrl(user.avatarId);
            }
            response.data = user;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return response;
    }
}
