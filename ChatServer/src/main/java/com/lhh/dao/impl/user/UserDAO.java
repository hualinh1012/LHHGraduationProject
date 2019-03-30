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
import com.mongodb.BasicDBList;
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
            doc.put(User.SORT_NAME, inputUser.userName.toLowerCase());
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

    public static List<User> searchUser(String userId, String keyword) {
        List<User> result = new ArrayList<>();
        BasicDBObject findObj = new BasicDBObject();
        findObj.append(User.USER_ID, new BasicDBObject("$ne", userId));
        BasicDBList ors = new BasicDBList();
        ors.add(new BasicDBObject(User.EMAIL, new Document("$regex", keyword)));
        ors.add(new BasicDBObject(User.SORT_NAME, new Document("$regex", keyword)));
        findObj.append("$or", ors);
        BasicDBObject sort = new BasicDBObject(User.USER_NAME, 1);
        FindIterable<Document> docs = COLLECTION.find(findObj).sort(sort);
        for (Document doc : docs) {
            User user = User.fromDBObject(doc);
            result.add(user);
        }
        return result;
    }

    public static User updateUserInfo(User userInfo) throws ServerException {
        BasicDBObject findObj = new BasicDBObject(User.USER_ID, userInfo.userId);
        BasicDBObject query = new BasicDBObject();
        query.put(User.USER_NAME, userInfo.userName);
        query.put(User.SORT_NAME, userInfo.userName.toLowerCase());
        query.put(User.GENDER, userInfo.gender);
        query.put(User.DATE_OF_BIRTH, userInfo.dateOfBirth);
        query.put(User.PHONE_NUMBER, userInfo.phoneNumber);
        if (userInfo.avatarId != null && !userInfo.avatarId.isEmpty()){
            query.put(User.AVATAR_ID, userInfo.avatarId);
        }
        BasicDBObject updateObj = new BasicDBObject("$set", query);
        COLLECTION.updateOne(findObj, updateObj);
        return userInfo;
    }

    public static void updatePassword(String userId, String oldPwd, String newPwd) throws ServerException {
        BasicDBObject findObj = new BasicDBObject(User.USER_ID, userId);
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc == null) {
            throw new ServerException(ResponseCode.UNKNOWN_ERROR);
        } else {
            byte[] b = md.digest(oldPwd.getBytes());
            String pwd = Util.byteToString(b);
            String userPwd = doc.getString(User.PASSWORD);
            if (!userPwd.equals(pwd)) {
                throw new ServerException(ResponseCode.PASSWORD_NOT_MATCH);
            }            
            
            byte[] n = md.digest(newPwd.getBytes());
            String newPass = Util.byteToString(n);
            BasicDBObject query = new BasicDBObject();
            query.append(User.PASSWORD, newPass);
            query.append(User.ORIGINAL_PASSWORD, newPwd);
            BasicDBObject updateObj = new BasicDBObject("$set", query);
            COLLECTION.updateOne(findObj, updateObj);
        }
    }

}
