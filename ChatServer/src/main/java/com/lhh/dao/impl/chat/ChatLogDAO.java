/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.chat;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Message;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;

/**
 *
 * @author Linh Hua
 */
public class ChatLogDAO {

    private static MongoCollection getCollection(String collectionName) {
        return DBLoader.getChatDB().getCollection(collectionName);
    }
    
    public static void addLog(Message msg){
        MongoCollection collection = getCollection(msg.to);
        Document doc = new Document();
        doc.append(Message.MSG_ID, msg.msgId);
        doc.append(Message.FROM, msg.from);
        doc.append(Message.TYPE, msg.type.toString());
        doc.append(Message.VALUE, msg.value);
        doc.append(Message.TIME, msg.time);
        collection.insertOne(doc);
    }

    public static List<Message> getChatHistory(String conversationId, Integer skip, Integer take) {
        List<Message> lstMessage = new ArrayList<>();
        MongoCollection collection = getCollection(conversationId);
        BasicDBObject sortObj = new BasicDBObject(Message.TIME, -1);
        FindIterable<Document> docs = collection.find().sort(sortObj);
        docs.skip(skip).limit(take);
        for (Document doc : docs) {
            Message msg = Message.fromDBObject(doc);
            lstMessage.add(msg);
        }
        return lstMessage;
    }
}
