/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.connection;

import javax.websocket.Session;

/**
 *
 * @author Linh
 */
public class UnAuthenticatedConnection {
    
    public Session session;
    
    public UnAuthenticatedConnection(Session session){
        this.session = session;
    }
}
