/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.UnreadConversation;
import com.lhh.util.Util;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 *
 * @author Linh Hua
 */
public class UnreadConversationDAO {
    private static final String COLLECTION_NAME = "unread_conversation";
    private static MongoCollection COLLECTION;

    static {
        try {
            COLLECTION = DBLoader.getUserDB().getCollection(COLLECTION_NAME);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }
    
    public static void updateUnreadMessage(String userId, String conversationId){
        BasicDBObject findObj = new BasicDBObject();
        findObj.append(UnreadConversation.CONVERSATION_ID, conversationId);
        findObj.append(UnreadConversation.USER_ID, userId);
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc != null){
            BasicDBObject updateObj = new BasicDBObject("$inc", new BasicDBObject(UnreadConversation.UNREAD_NUMBER, 1));
            COLLECTION.updateOne(findObj, updateObj);
        }
        else {
            Document insObj = new Document();
            insObj.append(UnreadConversation.CONVERSATION_ID, conversationId);
            insObj.append(UnreadConversation.USER_ID, userId);
            insObj.append(UnreadConversation.UNREAD_NUMBER, 1);
            COLLECTION.insertOne(insObj);
        }
    }

    public static Map<String, Integer> getUnreadNumber(String userId) {
        Map<String, Integer> result = new HashMap<>();        
        BasicDBObject findObj = new BasicDBObject(UnreadConversation.USER_ID, userId);
        FindIterable<Document> docs = COLLECTION.find(findObj);
        for (Document doc : docs) {
            String conversationId = doc.getString(UnreadConversation.CONVERSATION_ID);
            Integer unreadNumber = doc.getInteger(UnreadConversation.UNREAD_NUMBER);
            result.put(conversationId, unreadNumber);
        }
        return result;
    }

    public static void markRead(String userId, String conversationId) {
        BasicDBObject findObj = new BasicDBObject(UnreadConversation.USER_ID, userId);
        findObj.append(UnreadConversation.CONVERSATION_ID, conversationId);
        BasicDBObject updateObj = new BasicDBObject("$unset", new BasicDBObject(UnreadConversation.UNREAD_NUMBER, 1));
        COLLECTION.updateOne(findObj, updateObj);
    }
}
