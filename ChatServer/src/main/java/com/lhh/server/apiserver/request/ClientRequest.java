/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.request;

import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import java.util.Collection;
import javax.servlet.http.Part;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Linh
 */
public class ClientRequest {

    public JSONObject reqObj;
    public Part file;
    
    public String api;
    public String token;
    public String userAgent;

    public ClientRequest() {
    }

    public static ClientRequest initRequest(String requestStr) {
        try {
            JSONParser parser = new JSONParser();
            JSONObject jo = (JSONObject) parser.parse(requestStr);

            ClientRequest request = new ClientRequest();
            request.api = (String) jo.get(ParamKey.API_NAME);
            request.token = (String) jo.get(ParamKey.TOKEN_STRING);
            request.reqObj = jo;

            return request;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return null;
        }
    }
            
    public static ClientRequest initRequest(String token, String api, Collection<Part> partList) {
        ClientRequest request = new ClientRequest();
        request.api = api;
        request.token = token;
        request.reqObj = new JSONObject();
        for (Part part : partList){
            if (part.getName().equals(ParamKey.FILE)){
                request.file = part;
                break;
            }
        }
        return request;
    }

    public void put(String key, String value) {
        this.reqObj.put(key, value);
    }

    public boolean contain(String key) {
        return this.reqObj.containsKey(key);
    }

    public String toJson() {
        return reqObj.toJSONString();
    }

    @Override
    public String toString() {
        return toJson();
    }
    
    public String getStringParam(String paramKey){
        Object value = this.reqObj.get(paramKey);
        if (value == null){
            return null;
        }
        else {
            return String.valueOf(value);
        }
    }
    
    public Integer getIntegerParam(String paramKey){
        Object value = this.reqObj.get(paramKey);
        if (value == null){
            return null;
        }
        else {
            return Integer.valueOf(String.valueOf(value));
        }
    }
    
    public Double getDoubleParam(String paramKey){
        Object value = this.reqObj.get(paramKey);
        if (value == null){
            return null;
        }
        else {
            return Double.valueOf(String.valueOf(value));
        }
    }
    
}
