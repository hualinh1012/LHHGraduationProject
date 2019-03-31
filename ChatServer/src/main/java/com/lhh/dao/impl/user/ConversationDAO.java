/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.util.DateFormat;
import com.lhh.util.Util;
import com.lhh.util.constant.Constant;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;

/**
 *
 * @author Linh
 */
public class ConversationDAO {

    private static final String COLLECTION_NAME = "conversation";
    private static MongoCollection COLLECTION;

    static {
        try {
            COLLECTION = DBLoader.getUserDB().getCollection(COLLECTION_NAME);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }

    public static List<Conversation> getListConversation(String userId, Integer skip, Integer take) {
        List<Conversation> lstConversation = new ArrayList<>();
        Document findObj = new Document(Conversation.USER_LIST, new Document("$elemMatch", userId));
        Document sortObj = new Document(Conversation.TIME, -1);
        FindIterable result = COLLECTION.find(findObj).sort(sortObj);
        result.skip(skip).limit(take);
        MongoCursor cursor = result.iterator();
        while (cursor.hasNext()){
//            DBObject doc = (DBObject) cursor.next();
//            Conversation conversation = Conversation.fromDBObject(doc);
//            lstConversation.add(conversation);
        }
        return lstConversation;
    }

    public static boolean isConversationExist(String userId, String friendId) {
        BasicDBObject findObj = new BasicDBObject();
        BasicDBList ands = new BasicDBList();
        ands.add(new BasicDBObject(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId))));
        ands.add(new BasicDBObject(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, friendId))));
        findObj.append("$and", ands);
        findObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.PRIVATE);
        Util.addDebugLog("---> "+findObj);
        Document obj = (Document) COLLECTION.find(findObj).first();
        return obj != null;
    }

    public static Conversation createConversation(String userId, String friendId) {
        Document insObj = new Document();
        BasicDBList lstUser = new BasicDBList();
        lstUser.add(new BasicDBObject(Conversation.USER_ID, userId));
        lstUser.add(new BasicDBObject(Conversation.USER_ID, friendId));
        insObj.append(Conversation.USER_LIST, lstUser);
        insObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.PRIVATE);
        insObj.append(Conversation.TIME, DateFormat.format(Util.currentTime()));
        COLLECTION.insertOne(insObj);
        Conversation conversation = Conversation.fromDBObject(insObj);
        return conversation;
    }

    public static Conversation getConversation(String userId, String friendId) {
        BasicDBObject findObj = new BasicDBObject();
        BasicDBList ands = new BasicDBList();
        ands.add(new BasicDBObject(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId))));
        ands.add(new BasicDBObject(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, friendId))));
        findObj.append("$and", ands);
        findObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.PRIVATE);
        Util.addDebugLog("---> "+findObj);
        Document obj = (Document) COLLECTION.find(findObj).first();
        Conversation conversation = Conversation.fromDBObject(obj);
        return conversation;
    }
}
