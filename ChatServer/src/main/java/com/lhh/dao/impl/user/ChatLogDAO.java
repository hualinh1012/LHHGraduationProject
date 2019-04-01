/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Message;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

/**
 *
 * @author Linh Hua
 */
public class ChatLogDAO {

    private static MongoCollection getCollection(String collectionName) {
        return DBLoader.getUserDB().getCollection(collectionName);
    }
    
    public static void addLog(Message msg){
        MongoCollection collection = getCollection(msg.to);
        Document doc = new Document();
        doc.append(Message.MSG_ID, msg.msgId);
        doc.append(Message.FROM, msg.from);
        doc.append(Message.TYPE, msg.type);
        doc.append(Message.VALUE, msg.value);
        doc.append(Message.TIME, msg.time);
        collection.insertOne(doc);
    }
}
