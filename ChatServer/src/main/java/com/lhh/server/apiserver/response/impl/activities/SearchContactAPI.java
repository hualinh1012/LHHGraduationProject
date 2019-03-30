/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.activities;

import com.lhh.dao.impl.user.ContactDAO;
import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.ListEntityRespond;
import com.lhh.server.entity.impl.Contact;
import com.lhh.server.entity.impl.User;
import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseCode;
import java.util.ArrayList;
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
            String userId = request.getStringParam(ParamKey.USER_ID);
            String search = request.getStringParam(ParamKey.SEARCH);
            List<User> lstUser = UserDAO.searchUser(userId, search);
            List<String> lstContact = ContactDAO.getListContact(userId);
            List<Contact> result = new ArrayList<>();
            lstUser.forEach((user) -> {
                Contact contact = new Contact();
                contact.friendId = user.userId;
                contact.friendName = user.userName;
                contact.friendAva = user.avatarId;
                contact.status = 1;
                contact.isAdded = lstContact.contains(user.userId);
                result.add(contact);
            });
            response.data = result;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }
    
}
