/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao;

import com.mongodb.client.MongoDatabase;

/**
 *
 * @author Linh
 */
public class DBLoader {

    private static final MongoDatabase USER_DB = MongoConnection.mongo.getDatabase("user");
    private static final MongoDatabase CHAT_DB = MongoConnection.mongo.getDatabase("chatlog");
    private static final MongoDatabase FILE_DB = MongoConnection.mongo.getDatabase("file");

    public static MongoDatabase getUserDB() {
        return USER_DB;
    }

    public static MongoDatabase getChatDB() {
        return CHAT_DB;
    }

    public static MongoDatabase getFileDB() {
        return FILE_DB;
    }

}
