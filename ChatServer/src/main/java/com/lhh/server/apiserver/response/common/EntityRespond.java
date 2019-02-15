/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.common;

import com.lhh.server.entity.IEntity;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.util.constant.ParamKey;
import org.json.simple.JSONObject;

/**
 *
 * @author DuongLTD
 */
public class EntityRespond extends ServerResponse {

    public IEntity data;

    public EntityRespond() {
        super();
        this.data = null;
    }

    public EntityRespond(int code) {
        super(code);
        this.data = null;
    }

    public EntityRespond(int xErrorCode, IEntity xData) {
        super(xErrorCode);
        this.data = xData;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = super.toJsonObject();
        if (this.data != null) {
            jo.put(ParamKey.DATA, this.data.toJsonObject());
        }
        return jo;
    }

}
