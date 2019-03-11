/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response;

import com.lhh.util.constant.ResponseCode;
import com.lhh.util.constant.ParamKey;
import com.lhh.util.constant.ResponseMessage;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh
 */
public class ServerResponse {
    public int code;

    public ServerResponse(int code) {
        this.code = code;
    }

    public ServerResponse() {
        this.code = ResponseCode.UNKNOWN_ERROR;
    }
    
    public JSONObject toJsonObject(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(ParamKey.ERROR_CODE, code);
        jsonObject.put(ParamKey.ERROR_MESSAGE, ResponseMessage.getMessage(code));
        return jsonObject;
    }

    @Override
    public String toString(){
        return toJsonObject().toJSONString();
    }
}
