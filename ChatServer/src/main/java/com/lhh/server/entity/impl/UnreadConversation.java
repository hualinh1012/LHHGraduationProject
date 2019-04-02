/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import static com.lhh.server.entity.impl.Conversation.CONVERSATION_ID;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh Hua
 */
public class UnreadConversation implements IEntity {

    public static final String CONVERSATION_ID = "conversation_id";
    public String conversationId;

    public static final String USER_ID = "user_id";
    public String userId;

    public static final String UNREAD_NUMBER = "unread_number";
    public Integer unreadNumber;
    
    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        if (conversationId != null) {
            jo.put(CONVERSATION_ID, conversationId);
        }
        if (userId != null) {
            jo.put(USER_ID, userId);
        }
        if (unreadNumber != null) {
            jo.put(UNREAD_NUMBER, unreadNumber);
        }
        return jo;
    }
    
}
