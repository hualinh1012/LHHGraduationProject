/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.dao.impl.file;

import com.lhh.core.Config;
import com.lhh.dao.DBLoader;
import com.lhh.server.entity.impl.File;
import com.lhh.util.Util;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import org.bson.types.ObjectId;

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

    public static String getFileUrl(String fileId) {
        String fileUrl = null;
        Document findObj = new Document(File.ID, new ObjectId(fileId));
        Document doc = (Document) COLLECTION.find(findObj).first();
        if (doc != null){
            fileUrl = doc.getString(File.FILE_URL);
        }
        return Config.STREAMING_HOST + fileUrl;
    }

    public static Map<String, String> getListFileURL(List<String> lstFileId) {
        Map<String, String> result = new HashMap<>();
        if (lstFileId == null || lstFileId.isEmpty()){
            return result;
        }
        BasicDBList lstId = new BasicDBList();
        for (String id : lstFileId){
            if (id != null && !id.isEmpty()){
                lstId.add(new ObjectId(id));
            }
        }
        BasicDBObject findObj = new BasicDBObject(File.ID, new BasicDBObject("$in", lstId));
        FindIterable<Document> docs = COLLECTION.find(findObj);
        for (Document doc : docs) {
            String fileId = doc.getObjectId(File.ID).toString();
            String fileUrl = doc.getString(File.FILE_URL);
            result.put(fileId, Config.STREAMING_HOST + fileUrl);
        }
        return result;
    }
}
