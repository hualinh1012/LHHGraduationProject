/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh Hua
 */
public class File implements IEntity{
    
    public static final String ID = "_id";
    public static final String FILE_ID = "file_id";
    public String fileId;
    
    public static final String FILE_URL = "url";
    public String fileUrl;
    
    public File(String fileId) {
        this.fileId = fileId;
    }

    public File(String fileId, String fileUrl) {
        this.fileId = fileId;
        this.fileUrl = fileUrl;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        if (this.fileId != null){
            jo.put(FILE_ID, fileId);
        }
        if (this.fileUrl != null){
            jo.put(FILE_URL, fileUrl);
        }
        return jo;
    }
}
