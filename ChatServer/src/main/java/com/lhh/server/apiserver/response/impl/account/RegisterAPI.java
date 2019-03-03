/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.account;

import com.lhh.dao.impl.user.UserDAO;
import com.lhh.server.entity.impl.User;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.server.entity.impl.LoginData;
import com.lhh.server.session.Session;
import com.lhh.server.session.SessionManager;
import com.lhh.util.ServerException;
import com.lhh.util.Util;
import com.lhh.util.constant.ResponseCode;
import com.lhh.util.constant.ParamKey;

/**
 *
 * @author Linh
 */
public class RegisterAPI implements IApiAdapter{

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String userName = request.getStringParam(ParamKey.USER_NAME);
            String email = request.getStringParam(ParamKey.EMAIL);
            Integer gender = request.getIntegerParam(ParamKey.GENDER);
            String dateOfBirth = request.getStringParam(ParamKey.DATE_OF_BIRTH);
            String password = request.getStringParam(ParamKey.PASSWORD);
            String originalPwd = request.getStringParam(ParamKey.ORIGINAL_PASSWORD);
            User newUser = new User(userName, email, originalPwd, password, gender, dateOfBirth);
            if (newUser.isValidUserInfo()){
                User user = UserDAO.insertUser(newUser); 
                Session session = new Session(user.userId);
                SessionManager.add(session);
                response.data = new LoginData(session.token);
                response.code = ResponseCode.SUCCESS;
            }
        }
        catch (ServerException ex){
            response.code = ex.getErrorCode();
            Util.addErrorLog(ex);
        }
        catch (Exception ex){
            Util.addErrorLog(ex);
        }
        return response;
    }
    
}
