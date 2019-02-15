/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response;

import com.lhh.server.apiserver.response.impl.account.LoginAPI;
import com.lhh.server.apiserver.response.impl.account.RegisterAPI;
import com.lhh.util.constant.API;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

/**
 *
 * @author RuAc0n
 */
public class APIManager {

    private static final TreeMap<String, IApiAdapter> m = new TreeMap<>();
    private static final List<String> n = new ArrayList<>();

    //init api
    static {        
        m.put(API.REGISTER, new RegisterAPI());
        m.put(API.LOGIN, new LoginAPI());
    }
    
    //init list non-token api
    static {
        n.add(API.REGISTER);
        n.add(API.LOGIN);
    }

    public static IApiAdapter getApi(String apiName) {
        return m.get(apiName);
    }

    public static boolean isNonTokenApi(String apiName) {
        return n.contains(apiName);
    }
}
