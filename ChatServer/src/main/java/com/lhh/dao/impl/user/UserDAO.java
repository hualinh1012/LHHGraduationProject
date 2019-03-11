/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.User;
import com.lhh.util.DateFormat;
import com.lhh.util.ServerException;
import com.lhh.util.Util;
import com.lhh.util.constant.ResponseCode;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

/**
 *
 * @author Linh
 */
public class UserDAO {

    private static final String COLLECTION_NAME = "user";
    private static MongoCollection COLLECTION;
    private static MessageDigest md;

    static {
        try {
            COLLECTION = DBLoader.getUserDB().getCollection(COLLECTION_NAME);
            md = MessageDigest.getInstance("MD5");
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }

    public static User insertUser(User inputUser) throws ServerException {
        Document doc = new Document(User.EMAIL, inputUser.email);
        Document result = (Document) COLLECTION.find(doc).first();
        if (result != null) { // found email --> error
            throw new ServerException(ResponseCode.EMAIL_REGISTED);
        } else { //not found --> register
            byte[] b = md.digest(inputUser.password.getBytes());
            String uPass = Util.byteToString(b);
            inputUser.password = uPass;

            doc.put(User.EMAIL, inputUser.email);
            doc.put(User.USER_NAME, inputUser.userName);
            doc.put(User.GENDER, inputUser.gender);
            doc.put(User.DATE_OF_BIRTH, inputUser.dateOfBirth);
            doc.put(User.AVATAR_ID, inputUser.avatarId);
            doc.put(User.PASSWORD, inputUser.password);
            doc.put(User.ORIGINAL_PASSWORD, inputUser.originalPassword);
            doc.put(User.REGISTER_DATE, DateFormat.format(Util.getGMTTime()));
            COLLECTION.insertOne(doc);

            String userId = doc.getObjectId(User.ID).toString();
            upadateUserId(userId);

            User user = User.fromDBObject(doc);
            return user;
        }
    }

    private static void upadateUserId(String id) {
        BasicDBObject find = new BasicDBObject(User.ID, new ObjectId(id));
        BasicDBObject set = new BasicDBObject("$set", new BasicDBObject(User.USER_ID, id));
        COLLECTION.updateOne(find, set);
    }

    public static User login(String email, String password) throws ServerException {
        Bson findObj = new Document(User.EMAIL, email);
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc == null) {
            throw new ServerException(ResponseCode.EMAIL_NOTE_FOUND);
        } else {
            byte[] b = md.digest(password.getBytes());
            String pwd = Util.byteToString(b);

            String userPwd = doc.getString(User.PASSWORD);
            if (!userPwd.equals(pwd)) {
                throw new ServerException(ResponseCode.PASSWORD_NOT_MATCH);
            }

            User user = User.fromDBObject(doc);
            return user;
        }
    }

    public static User getUserInfo(String friendId) {
        Bson findObj = new Document(User.ID, new ObjectId(friendId));
        Document doc = (Document) COLLECTION.find(findObj).first();
        User user = User.fromDBObject(doc);
        return user;
    }

    public static List<User> getUserInfo(List<String> lstUID) {
        List<User> lstUser = new ArrayList<>();
        Bson findObj = Filters.in(User.USER_ID, lstUID);
        Bson sortObj = new Document(User.USER_NAME, 1);
        Iterable<Document> result = COLLECTION.find(findObj).sort(sortObj);
        for (Document doc : result) {
            User user = User.fromDBObject(doc);
            lstUser.add(user);
        }
        return lstUser;
    }

    public static List<User> searchUser(String keyword) {
        List<User> result = new ArrayList<>();
        Document email = new Document(User.EMAIL, new Document("$regex", keyword));
        Document userName = new Document(User.USER_NAME, new Document("$regex", keyword));
        Bson query = Filters.or(email, userName);
        Document sort = new Document(User.USER_NAME, -1);
        FindIterable<Document> docs = COLLECTION.find(query).sort(sort);
        for (Document doc : docs) {
            User user = User.fromDBObject(doc);
            result.add(user);
        }
        return result;
    }

}
