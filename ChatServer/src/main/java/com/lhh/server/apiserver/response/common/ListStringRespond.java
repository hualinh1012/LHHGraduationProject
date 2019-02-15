/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.common;

import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.util.constant.ParamKey;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
/**
 *
 * @author RuAc0n
 */
public class ListStringRespond extends ServerResponse {
    
    public List<String> data;

    public ListStringRespond() {
        super();
    }
    
    public ListStringRespond(int code , List<String> data) {
        super(code);
        this.data = data;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = super.toJsonObject();
        if (this.data != null) {
            JSONArray arr = new JSONArray();
            this.data.stream().forEach((dt) -> {
                arr.add(dt);
            });
            jo.put(ParamKey.DATA, arr);
        }

        return jo;
    }
}
