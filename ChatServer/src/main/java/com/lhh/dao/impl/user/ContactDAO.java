/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.user;

import com.lhh.dao.DBLoader;
import com.lhh.util.Util;
import com.mongodb.client.MongoCollection;
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
    
    public static void add(String friendId) {
        
    }
    
}
