/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Conversation;
import com.lhh.util.Util;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
            Document doc = (Document) cursor.next();
            Conversation conversation = new Conversation();
            conversation.conversationId = doc.getObjectId(Conversation.ID).toString();
            conversation.conversationName = doc.getString(Conversation.CONVERSATION_NAME);
            conversation.conversationType = doc.getInteger(Conversation.CONVERSATION_TYPE);
            conversation.avatarId = doc.getString(Conversation.AVATAR_ID);
            conversation.lastMessage = doc.getString(Conversation.LAST_MESSAGE);
            conversation.time = doc.getString(Conversation.TIME);
            lstConversation.add(conversation);
        }
        return lstConversation;
    }
}
