/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.activities;

import com.lhh.dao.impl.user.ContactDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;

/**
 *
 * @author Linh Hua
 */
public class AddContactAPI implements IApiAdapter {
    @Override
    public ServerResponse execute(ClientRequest request) {
        ServerResponse response = new ServerResponse();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            String friendId = request.getStringParam(ParamKey.FRIEND_ID);
            ContactDAO.add(userId, friendId);
            response.code = ResponseCode.SUCCESS;
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }
}
