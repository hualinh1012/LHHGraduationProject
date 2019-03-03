/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.session;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author Linh
 */
public class SessionManager {

    public static Map<String, Session> SS = new ConcurrentHashMap<>();

    public static boolean isTokenExist(String token) {
        return SS.containsKey(token);
    }

    public static Session getSession(String token) {
        if (token != null) {
            Session session = SS.get(token);
            return session;
        } else {
            return null;
        }
    }
    
    public static void add(Session session){
        SS.put(session.token, session);
    }
}
