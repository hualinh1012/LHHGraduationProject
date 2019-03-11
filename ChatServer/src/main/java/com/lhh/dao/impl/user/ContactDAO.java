/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.Contact;
import com.lhh.util.Util;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import java.util.ArrayList;
import java.util.List;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

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
        BasicDBObject findObj = new BasicDBObject(Contact.ID, new ObjectId(userId));
        findObj.append(Contact.LIST_CONTACT, friendId);
        Bson contact = (BasicDBObject) COLLECTION.find(findObj).first();
        if (contact != null) {
            BasicDBObject obj = new BasicDBObject(Contact.LIST_CONTACT, friendId);
            BasicDBObject updateCommand = new BasicDBObject("$push", obj);
            COLLECTION.updateOne(findObj, updateCommand);
        }
    }

    public static List<String> getListContact(String userId) {
        List<String> result = new ArrayList<>();
        BasicDBObject findObj = new BasicDBObject(Contact.ID, new ObjectId(userId));
        BasicDBObject contact = (BasicDBObject) COLLECTION.find(findObj).first();
        BasicDBList lstContact = (BasicDBList) contact.get(Contact.LIST_CONTACT);
        for (Object friendId : lstContact){
            result.add(friendId.toString());
        }
        return result;
    }

}
