/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Contact;
import com.lhh.util.DateFormat;
import com.lhh.util.Util;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;

/**
 *
 * @author Linh Hua
 */
public class ContactDAO {

    private static final String COLLECTION_NAME = "contact";
    private static MongoCollection COLLECTION;

    static {
        try {
            COLLECTION = DBLoader.getUserDB().getCollection(COLLECTION_NAME);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }

    public static void add(String userId, String friendId) {
        Document document = new Document(Contact.USER_ID, userId);
        document.append(Contact.USER_ID, userId);
        document.append(Contact.FRIEND_ID, friendId);
        Bson obj = (Bson) COLLECTION.find(document).first();
        if (obj == null){
            document.append(Contact.TIME, DateFormat.format(new Date()));
            COLLECTION.insertOne(document);
        }
    }

    public static List<String> getListContact(String userId) {
        List<String> result = new ArrayList<>();
        BasicDBObject findObj = new BasicDBObject(Contact.USER_ID, userId);
        FindIterable<Document> docs = COLLECTION.find(findObj);
        for (Document doc : docs) {
            String friendId = doc.getString(Contact.FRIEND_ID);
            result.add(friendId);
        }
        return result;
    }

}
