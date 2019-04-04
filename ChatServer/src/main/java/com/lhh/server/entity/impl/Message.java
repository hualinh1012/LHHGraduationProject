/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import com.lhh.util.Util;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Linh
 */
public class Message implements IEntity {

    public static final String MSG_ID = "msg_id";
    public String msgId;

    public static final String FROM = "from";
    public String from;

    public static final String TO = "to";
    public String to;

    public static final String TIME = "time";
    public String time; 

    public static final String TYPE = "type";
    public MessageType type; 

    public static final String VALUE = "value";
    public String value; 
    
    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        jo.put(MSG_ID, msgId);
        jo.put(FROM, from);
        jo.put(TO, to);
        jo.put(TIME, time);
        jo.put(TYPE, type.toString());
        jo.put(VALUE, value);
        return jo;        
    }
    
    public static Message fromJsonObject(String jsonString) throws ParseException {
        JSONObject json = Util.fromJSONObject(jsonString);
        Message msg = new Message();
        msg.msgId = new ObjectId().toString();
        msg.from = (String) json.get(FROM);
        msg.to = (String) json.get(TO);
        msg.time = (String) json.get(TIME);
        msg.type = MessageType.valueOf((String) json.get(TYPE));
        msg.value = (String) json.get(VALUE);
        return msg;        
    }
    
    public static Message fromDBObject(Document doc) {
        Message msg = new Message();
        msg.msgId = (String) doc.get(MSG_ID);
        msg.from = (String) doc.get(FROM);
        msg.time = (String) doc.get(TIME);
        msg.type = MessageType.valueOf((String) doc.get(TYPE));
        msg.value = (String) doc.get(VALUE);
        return msg;
    }
    
    public enum MessageType {
        AUTH,
        TEXT,
        FILE,
        EMOJI,
    }

}
