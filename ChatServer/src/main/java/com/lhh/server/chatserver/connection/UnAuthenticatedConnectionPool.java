/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.connection;

import java.util.HashMap;
import javax.websocket.Session;

/**
 *
 * @author Linh
 */
public class UnAuthenticatedConnectionPool {

    public static HashMap<String, UnAuthenticatedConnection> unauthenSessionMap = new HashMap<>();

    public static void put(Session session) {
        unauthenSessionMap.put(session.getId(), new UnAuthenticatedConnection(session));
    }

    public static void remove(String sessionId) {
        unauthenSessionMap.remove(sessionId);
    }

    public static Session get(String sessionId) {
        UnAuthenticatedConnection UAS = unauthenSessionMap.get(sessionId);
        if (UAS == null) {
            return null;
        } else {
            return UAS.session;
        }
    }
}
