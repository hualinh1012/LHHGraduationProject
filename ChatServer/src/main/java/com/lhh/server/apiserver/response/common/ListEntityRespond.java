/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.common;

import com.lhh.server.entity.IEntity;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.util.constant.ParamKey;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author RuAc0n
 * @param <T>
 */
public class ListEntityRespond<T> extends ServerResponse {
    
    public List<T> data;

    public ListEntityRespond() {
        super();
    }
    
    public ListEntityRespond(int code , List<T> data) {
        super(code);
        this.data = data;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = super.toJsonObject();
        if (this.data != null) {
            JSONArray arr = new JSONArray();
            for (T dt : this.data) {
                arr.add(((IEntity)dt).toJsonObject());
            }
            jo.put(ParamKey.DATA, arr);
        }

        return jo;
    }
}
