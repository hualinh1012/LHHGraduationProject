/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.request;

import com.lhh.util.Util;
import com.lhh.util.constant.ParamKey;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Linh
 */
public class ClientRequest {

    public JSONObject reqObj;
    public String api;
    public String token;
    public String userAgent;

    public ClientRequest() {
    }

    public static ClientRequest initRequest(String requestStr) {
        try {
            JSONParser parser = new JSONParser();
            JSONObject jo = (JSONObject) parser.parse(requestStr);

            ClientRequest r = new ClientRequest();
            r.api = (String) jo.get(ParamKey.API_NAME);
            r.token = (String) jo.get(ParamKey.TOKEN_STRING);
            r.reqObj = jo;

            return r;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return null;
        }
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
