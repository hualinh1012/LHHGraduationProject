/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh
 */
public class LoginData implements IEntity {
    public static final String TOKEN = "token";
    public String token;
    
    public static final String USER_ID = "user_id";
    public String userId;

    public LoginData(String token, String userId) {
        this.token = token;
        this.userId = userId;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        jo.put(TOKEN, token);
        jo.put(USER_ID, userId);
        return jo;
    }
    
}
