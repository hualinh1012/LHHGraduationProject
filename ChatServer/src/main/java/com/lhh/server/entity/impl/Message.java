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
public class Message implements IEntity, Cloneable {

    public static final String MSG_ID = "msg_id";
    public String msgId;

    public static final String FROM = "from";
    public String from;

    public static final String FROM_INFO = "from_info";
    public JSONObject fromInfo;

    public static final String TO = "to";
    public String to;

    public static final String TIME = "time";
    public String time;

    public static final String TYPE = "type";
    public MessageType type;

    public static final String VALUE = "value";
    public String value;

    public static final String IS_OWNED = "is_owned";
    public Boolean isOwned;

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        jo.put(MSG_ID, msgId);
        jo.put(FROM, from);
        if (fromInfo != null) {
            jo.put(FROM_INFO, fromInfo);
        }
        jo.put(TO, to);
        jo.put(TIME, time);
        jo.put(TYPE, type.toString());
        jo.put(VALUE, value);
        jo.put(IS_OWNED, isOwned);
        return jo;
    }

    public static Message fromJsonObject(String jsonString) throws ParseException {
        JSONObject json = Util.fromJSONObject(jsonString);
        Message msg = new Message();
        String msgId = (String) json.get(MSG_ID);
        if (msgId == null) {
            msg.msgId = new ObjectId().toString();
        } else {
            msg.msgId = msgId;
        }
        msg.from = (String) json.get(FROM);
        msg.to = (String) json.get(TO);
        msg.time = (String) json.get(TIME);
        msg.type = MessageType.valueOf((String) json.get(TYPE));
        msg.value = (String) json.get(VALUE);
        msg.fromInfo = (JSONObject) json.get(FROM_INFO);
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
        PRC,
        CMD,
        CALL,
        SDP,
        ICE
    }

    @Override
    public Message clone() throws CloneNotSupportedException {
        return (Message) super.clone();
//        Message msg = new Message();
//        msg.msgId = this.msgId;
//        msg.from = this.from;
//        msg.fromInfo = this.fromInfo;
//        msg.to = this.to;
//        msg.time = this.time;
//        msg.type = this.type;
//        msg.value = this.value;
//        msg.isOwned = this.isOwned;
//        return msg;
    }
}
