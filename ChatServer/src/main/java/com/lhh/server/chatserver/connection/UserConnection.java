/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.connection;

import com.lhh.server.entity.impl.Message;
import java.util.concurrent.ConcurrentLinkedQueue;
import javax.websocket.Session;

/**
 *
 * @author Linh Hua
 */
public class UserConnection {

    public String userId;
    public Session session;
    
    public ConcurrentLinkedQueue<Message> inbox;
    public ConcurrentLinkedQueue<Message> outbox;

    public UserConnection(String userId, Session session) {
        this.userId = userId;
        this.session = session;
        inbox = new ConcurrentLinkedQueue<>();
        outbox = new ConcurrentLinkedQueue<>();
    }    
}
