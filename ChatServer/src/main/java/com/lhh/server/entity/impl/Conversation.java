/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import java.util.List;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh
 */
public class Conversation implements IEntity {

    public static final String ID = "_id";
    public static final String CONVERSATION_ID = "conversation_id";
    public String conversationId;

    public static final String CONVERSATION_NAME = "conversation_name";
    public String conversationName;

    public static final String CONVERSATION_TYPE = "conversation_type";
    public Integer conversationType;

    public static final String AVATAR_ID = "avatar_id";
    public String avatarId;

    public static final String AVATAR_URL = "avatar_url";
    public String avatarUrl;

    public static final String LAST_MESSAGE = "last_message";
    public String lastMessage;

    public static final String TIME = "time";
    public String time;

    public static final String USER_LIST = "lst_user";
    public List<String> lstUser;

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        jo.put(CONVERSATION_ID, conversationId);
        jo.put(CONVERSATION_NAME, conversationName);
        jo.put(AVATAR_ID, avatarId);
        jo.put(AVATAR_URL, avatarUrl);
        jo.put(LAST_MESSAGE, lastMessage);
        jo.put(TIME, time);
        return jo;
    }
}
