/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.server.entity.impl.Message;
import com.lhh.util.DateFormat;
import com.lhh.util.Util;
import com.lhh.util.constant.Constant;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;

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
        Document findObj = new Document(Conversation.USER_LIST, new Document("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId)));
        Document sortObj = new Document(Conversation.LAST_MESSAGE_TIME, -1);
        FindIterable<Document> docs = COLLECTION.find(findObj).sort(sortObj);
//        docs.skip(skip).limit(take);
        for (Document doc : docs) {
            Conversation conversation = Conversation.fromDBObject(doc);
            if (conversation.conversationType == Constant.ConversationType.PRIVATE && conversation.lastMessageValue != null) {
                lstConversation.add(conversation);
            }
            else if (conversation.conversationType == Constant.ConversationType.GROUP){
                lstConversation.add(conversation);
            }
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
        Util.addDebugLog("---> " + findObj);
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
        insObj.append(Conversation.CREATE_TIME, DateFormat.format(Util.currentTime()));
        COLLECTION.insertOne(insObj);
        Conversation conversation = Conversation.fromDBObject(insObj);
        return conversation;
    }

    public static Conversation createGroupConversation(List<String> lstUserId) {
        Document insObj = new Document();
        BasicDBList lstUser = new BasicDBList();
        for (String id : lstUserId) {
            lstUser.add(new BasicDBObject(Conversation.USER_ID, id));
        }
        insObj.append(Conversation.USER_LIST, lstUser);
        insObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.GROUP);
        insObj.append(Conversation.CREATE_TIME, DateFormat.format(Util.currentTime()));
        insObj.append(Conversation.LAST_MESSAGE_TIME, DateFormat.format(Util.currentTime()));
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
        Util.addDebugLog("---> " + findObj);
        Document obj = (Document) COLLECTION.find(findObj).first();
        if (obj != null) {
            Conversation conversation = new Conversation();
            conversation.conversationId = obj.get(Conversation.ID).toString();
            return conversation;
        } else {
            return null;
        }
    }

    public static List<String> getMember(String id) {
        List<String> lstUserId = new ArrayList<>();
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(id));
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc != null) {
            ArrayList friends = (ArrayList) doc.get(Conversation.USER_LIST);
            for (Object o : friends) {
                Document friend = (Document) o;
                String friendId = (String) friend.get(Conversation.USER_ID);
                lstUserId.add(friendId);
            }
        }
        return lstUserId;
    }

    public static void updateConversation(Message msg) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(msg.to));
        BasicDBObject query = new BasicDBObject();
        query.append(Conversation.LAST_MESSAGE_FROM, msg.from);
        query.append(Conversation.LAST_MESSAGE_TYPE, msg.type.toString());
        query.append(Conversation.LAST_MESSAGE_VALUE, msg.value);
        query.append(Conversation.LAST_MESSAGE_TIME, msg.time);
        BasicDBObject updObj = new BasicDBObject("$set", query);
        COLLECTION.updateOne(findObj, updObj);
    }

    public static Conversation getConversationDetail(String conversationId) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(conversationId));
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc != null) {
            Conversation conversation = Conversation.fromDBObject(doc);
            return conversation;
        } else {
            return null;
        }
    }
    
    public static Conversation getGroupConversationDetail(String userId, String conversationId) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(conversationId));
        findObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.GROUP);
        findObj.append(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId)));
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc != null) {
            Conversation conversation = Conversation.fromDBObject(doc);
            return conversation;
        } else {
            return null;
        }
    }

    public static boolean updateConversationName(String userId, String conversationId, String conversationName) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(conversationId));
        findObj.append(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId)));
        BasicDBObject updateObj = new BasicDBObject("$set", new BasicDBObject(Conversation.CONVERSATION_NAME, conversationName));
        UpdateResult result = COLLECTION.updateOne(findObj, updateObj);
        return result.getModifiedCount() > 0;
    }

    public static boolean updateConversationAvatar(String userId, String conversationId, String avatarId) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(conversationId));
        findObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.GROUP);
        findObj.append(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId)));
        BasicDBObject updateObj = new BasicDBObject("$set", new BasicDBObject(Conversation.AVATAR_ID, avatarId));
        UpdateResult result = COLLECTION.updateOne(findObj, updateObj);
        return result.getModifiedCount() > 0;
    }

    public static void addFriend(String userId, String conversationId, List<String> lstFriendId) {
        BasicDBObject findObj = new BasicDBObject(Conversation.ID, new ObjectId(conversationId));
        findObj.append(Conversation.CONVERSATION_TYPE, Constant.ConversationType.GROUP);
        findObj.append(Conversation.USER_LIST, new BasicDBObject("$elemMatch", new BasicDBObject(Conversation.USER_ID, userId)));
        BasicDBList lstFriend = new BasicDBList();
        for (String id : lstFriendId){
            lstFriend.add(new BasicDBObject(Conversation.USER_ID, id));
        }
        BasicDBObject query = new BasicDBObject(Conversation.USER_LIST, new BasicDBObject("$each", lstFriend));
        BasicDBObject updateObj = new BasicDBObject("$push", query);
        COLLECTION.updateOne(findObj, updateObj);
    }
}
