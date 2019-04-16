/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.file;

import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.File;
import com.lhh.util.Util;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

/**
 *
 * @author Linh Hua
 */
public class FileDAO {
    private static final String COLLECTION_NAME = "file";
    private static MongoCollection COLLECTION;

    static {
        try {
            COLLECTION = DBLoader.getFileDB().getCollection(COLLECTION_NAME);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }
    
    public static File insertFile(String url){
        Document doc = new Document(File.FILE_URL, url);
        COLLECTION.insertOne(doc);
        String id = doc.getObjectId(File.ID).toString();
        return new File(id, url);
    }
}
