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

    private static final MongoDatabase USER_DB = MongoConnection.mongo.getDatabase("userdb");
    private static final MongoDatabase CHAT_DB = MongoConnection.mongo.getDatabase("chatlogdb");
    private static final MongoDatabase STATIC_FILE_DB = MongoConnection.mongo.getDatabase("staticfiledb");

    public static MongoDatabase getUserDB() {
        return USER_DB;
    }

    public static MongoDatabase getChatDB() {
        return CHAT_DB;
    }

    public static MongoDatabase getStaticFileDB() {
        return STATIC_FILE_DB;
    }

}
