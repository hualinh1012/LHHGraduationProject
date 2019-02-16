/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.connection;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 *
 * @author Linh Hua
 */
public class UCStorage {
    private static final ConcurrentHashMap<String, List<UserConnection>> CONNECTION_MAP = new ConcurrentHashMap<>();
    private static final ConcurrentLinkedQueue<UserConnection> CONNECTION_QUEUE = new ConcurrentLinkedQueue<>();
    
    public static List<UserConnection> getUserConnections(String userId){
        if (userId == null){
            return null;
        }
        else {
            return CONNECTION_MAP.get(userId);
        }
    }
    
    public static void addConnection(UserConnection uc){
        if (uc == null || uc.userId == null){
            return;
        }
        List<UserConnection> userConnections = CONNECTION_MAP.get(uc.userId);
        if (userConnections == null){
            userConnections = new ArrayList<>();
        }
        userConnections.add(uc);
        
        CONNECTION_MAP.put(uc.userId, userConnections);
        CONNECTION_QUEUE.add(uc);
    }
    
    public static UserConnection poll(){
        return CONNECTION_QUEUE.poll();
    }
}