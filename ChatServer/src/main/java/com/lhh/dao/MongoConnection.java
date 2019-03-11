/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao;

import com.lhh.core.Config;
import com.lhh.util.Util;
import com.mongodb.MongoClient;

/**
 *
 * @author Linh
 */
public class MongoConnection {
        
    public static MongoClient mongo;

    public static void init() {
        try {
//            mongo = new MongoClient("210.148.155.138", Config.DB_PORT);
            mongo = new MongoClient(Config.SERVER_HOST, Config.DB_PORT);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }
}
