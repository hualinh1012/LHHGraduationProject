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
public class Contact implements IEntity {
    
    public static final String USER_ID = "user_id";
    
    public static final String FRIEND_ID = "friend_id";
    public String friendId;
    
    public static final String TIME = "time";
    public String time;
    
    public static final String FRIEND_NAME = "friend_name";
    public String friendName;
    
    public static final String FRIEND_AVA = "friend_ava";
    public String friendAva;
    
    public static final String STATUS = "status";
    public Integer status;
    
    public static final String IS_ADDED = "is_added";
    public Boolean isAdded;

    public Contact() {
    }

    public Contact(String friendId) {
        this.friendId = friendId;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        if (friendId != null){
            jo.put(FRIEND_ID, friendId);
        }
        if (friendName != null){
            jo.put(FRIEND_NAME, friendName);
        }
        if (friendAva != null){
            jo.put(FRIEND_AVA, friendAva);
        }
        if (status != null){
            jo.put(STATUS, status);
        }
        if (isAdded != null){
            jo.put(IS_ADDED, isAdded);
        }
        return jo;
    }
}
