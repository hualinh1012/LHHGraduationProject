/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.connection;

import javax.websocket.Session;

/**
 *
 * @author Linh Hua
 */
public class UserConnection {

    public String userId;
    public Session session;

    public boolean authFlag;
    public long expTime;

    public UserConnection(String userId, Session session) {
        this.userId = userId;
        this.session = session;
    }

    public UserConnection(String userId, Session session, boolean authFlag, long expTime) {
        this.userId = userId;
        this.session = session;
        this.authFlag = authFlag;
        this.expTime = expTime;
    }
    
}
