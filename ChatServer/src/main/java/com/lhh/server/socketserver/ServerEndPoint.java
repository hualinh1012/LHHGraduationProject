/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.socketserver;


import java.io.IOException;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Administrator
 */

@ServerEndpoint(value = "/chat")
public class ServerEndPoint {
    
    @OnOpen
    public void onOpen(Session userSession) {
        
    }

    @OnClose
    public void onClose(Session userSession, CloseReason reason) throws IOException {
        
    }

    @OnMessage
    public void onMessage(Session userSession, String message) throws IOException {
        
        
    }
    
    @OnError
    public void error(Session session, Throwable t) throws IOException {
        
    }
    
}