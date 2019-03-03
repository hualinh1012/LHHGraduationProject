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

    public LoginData(String token) {
        this.token = token;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        jo.put(TOKEN, token);
        return jo;
    }
    
}
