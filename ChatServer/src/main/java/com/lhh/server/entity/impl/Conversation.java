/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import java.util.List;
import org.bson.Document;
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

    public static final String CREATE_TIME = "create_time";
    public String create_time;

    public static final String AVATAR_ID = "avatar_id";
    public String avatarId;

    public static final String AVATAR_URL = "avatar_url";
    public String avatarUrl;

    public static final String LAST_MESSAGE_TYPE = "last_message_type";
    public String lastMessageType;

    public static final String LAST_MESSAGE_VALUE = "last_message_value";
    public String lastMessageValue;

    public static final String TIME = "time";
    public String time;

    public static final String USER_ID = "user_id";
    
    public static final String USER_LIST = "lst_user";
    public List<String> lstUser;
    
    public static final String IS_EXISTED = "is_existed";
    public Boolean isExisted;

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        if (conversationId != null) {
            jo.put(CONVERSATION_ID, conversationId);
        }
        if (conversationName != null) {
            jo.put(CONVERSATION_NAME, conversationName);
        }
        if (avatarId != null) {
            jo.put(AVATAR_ID, avatarId);
        }
        if (avatarUrl != null) {
            jo.put(AVATAR_URL, avatarUrl);
        }
        if (lastMessageType != null) {
            jo.put(LAST_MESSAGE_TYPE, lastMessageType);
        }
        if (lastMessageValue != null) {
            jo.put(LAST_MESSAGE_VALUE, lastMessageValue);
        }
        if (time != null) {
            jo.put(TIME, time);
        }
        if (isExisted != null) {
            jo.put(IS_EXISTED, isExisted);
        }
        return jo;
    }

    public static Conversation fromDBObject(Document obj) {
        Conversation conversation = new Conversation();
        conversation.conversationId = obj.get(Conversation.ID).toString();
        conversation.conversationName = (String) obj.get(Conversation.CONVERSATION_NAME);
        conversation.conversationType = (Integer) obj.get(Conversation.CONVERSATION_TYPE);
        conversation.avatarId = (String) obj.get(Conversation.AVATAR_ID);
        conversation.lastMessageType = (String) obj.get(Conversation.LAST_MESSAGE_TYPE);
        conversation.lastMessageValue = (String) obj.get(Conversation.LAST_MESSAGE_VALUE);
        conversation.time = (String) obj.get(Conversation.TIME);
        return conversation;
    }
}
