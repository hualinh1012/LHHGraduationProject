/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util.constant;

import com.lhh.util.Util;
import java.lang.reflect.Field;
import java.util.HashMap;

/**
 *
 * @author Linh Hua
 */
public class ResponseMessage {
    private static final HashMap<Integer, String> MAP;
    
    static {
        MAP = new HashMap<>();
        Field[] declaredFields = ResponseCode.class.getDeclaredFields();
        try {
            for (Field f : declaredFields) {
                Integer code = f.getInt(null);
                String message = f.getName();
                
                MAP.put(code, message);
            }
        }
        catch (IllegalAccessException | IllegalArgumentException ex){
            Util.addErrorLog(ex);
        }
    }
    
    public static String getMessage(int code){
        return MAP.get(code);
    }
}
