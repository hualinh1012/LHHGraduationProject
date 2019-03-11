/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.activities;

import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.ListEntityRespond;
import com.lhh.server.entity.impl.User;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.List;

/**
 *
 * @author Linh Hua
 */
public class SearchContactAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        ListEntityRespond response = new ListEntityRespond();
        try {
            String search = request.getStringParam(ParamKey.SEARCH);
            List<User> lstUser = UserDAO.searchUser(search);
            response.data = lstUser;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }
    
}
