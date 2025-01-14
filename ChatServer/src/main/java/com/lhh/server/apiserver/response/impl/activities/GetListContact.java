/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.activities;

import com.lhh.dao.impl.file.FileDAO;
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
import java.util.Map;

/**
 *
 * @author Linh
 */
public class GetListContact implements IApiAdapter {
    @Override
    public ServerResponse execute(ClientRequest request) {
        ListEntityRespond response = new ListEntityRespond();
        try {
            String userId = request.getStringParam(ParamKey.USER_ID);
            Integer skip = request.getIntegerParam(ParamKey.SKIP);
            Integer take = request.getIntegerParam(ParamKey.TAKE);
            List<String> lstContactId = ContactDAO.getListContact(userId);
            List<User> lstUserInfo = UserDAO.getUserInfo(lstContactId);
            List<Contact> lstContact = new ArrayList<>();
            List<String> lstAvaId = new ArrayList<>();
            for (User user : lstUserInfo){
                Contact contact = new Contact();
                contact.friendId = user.userId;
                contact.friendName = user.userName;
                contact.friendAvaId = user.avatarId;
                contact.status = 1;
                contact.isAdded = true;
                lstContact.add(contact);
                if (contact.friendAvaId != null){
                    lstAvaId.add(contact.friendAvaId);
                }
            }
            Map<String, String> lstAvaUrl = FileDAO.getListFileURL(lstAvaId);
            for (Contact contact : lstContact){
                if (contact.friendAvaId != null && !contact.friendAvaId.isEmpty()){
                    contact.friendAva = lstAvaUrl.get(contact.friendAvaId);
                }
            }
            response.data = lstContact;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception e) {
            Util.addErrorLog(e);
        }
        return response;
    }
}