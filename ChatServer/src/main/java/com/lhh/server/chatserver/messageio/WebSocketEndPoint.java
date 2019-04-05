/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.messageio;

import com.lhh.core.Config;
import com.lhh.server.chatserver.connection.UnAuthenticatedConnectionPool;
import com.lhh.server.chatserver.connection.UserConnection;
import com.lhh.server.chatserver.connection.UserConnectionStorage;
import com.lhh.server.entity.impl.Message;
import com.lhh.server.session.SessionManager;
import com.lhh.util.DateFormat;
import com.lhh.util.Util;
import java.io.IOException;
import java.util.List;
import javax.websocket.CloseReason;
import javax.websocket.DeploymentException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.glassfish.tyrus.server.Server;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Administrator
 */
@ServerEndpoint(value = "/chat")
public class WebSocketEndPoint implements Runnable {

    @Override
    public void run() {
        try {
            Server webSocketServer = new Server(Config.WEBSOCKET_SERVER_HOST, Config.WEB_SOCKET_PORT, "/ws", null, WebSocketEndPoint.class);
            webSocketServer.start();
        } catch (DeploymentException e) {
            Util.addErrorLog(e);
        }
    }
    
    @OnOpen
    public void onOpen(Session userSession) {
        Util.addDebugLog("----> Web socket: Unauthenticated connection has connect to server");
        UnAuthenticatedConnectionPool.put(userSession);
    }

    @OnClose
    public void onClose(Session userSession, CloseReason reason) {
        try {
            Util.addDebugLog("----> Web socket: session close...");
            UserConnectionStorage.remove(userSession);
            if (userSession.isOpen()) {
                userSession.close();
            }
        } catch (IOException ex) {
            Util.addErrorLog(ex);
        }
    }

    @OnError
    public void error(Session session, Throwable t) {
        try {
            Util.addDebugLog("----> Web socket: session encounter error -> close...");
            Util.addErrorLog((Exception) t);
            UserConnectionStorage.remove(session);
            if (session.isOpen()) {
                session.close();
            }
        } catch (IOException ex) {
            Util.addErrorLog(ex);
        }
    }

    @OnMessage
    public void onMessage(Session userSession, String message) {
        try {
            Util.addDebugLog("----> Web socket: receive message from client: " + message);
            Message msg = Message.fromJsonObject(message);
            switch (msg.type) {
                case AUTH: {
                    String result = "fail";
                    if (UnAuthenticatedConnectionPool.get(userSession.getId()) != null) {
                        boolean isValid = SessionManager.isTokenExist(msg.value);
                        if (isValid) {
                            UnAuthenticatedConnectionPool.remove(userSession.getId());
                            UserConnectionStorage.addConnection(new UserConnection(msg.from, userSession));
                            Util.addDebugLog("----> Web socket: socket is valid, add to POLL");
                            result = "success";
                        }
                    }
                    msg.value = result;
                    msg.to = msg.from;
                    msg.from = "SERVER";
                    msg.time = DateFormat.format(Util.currentTime());
                    userSession.getAsyncRemote().sendText(msg.toJsonObject().toJSONString());
                    break;
                }
                default: {
                    Util.addDebugLog("----> Web socket: receive message!!!!");
                    boolean isValidSession = false;
                    List<UserConnection> users = UserConnectionStorage.getUserConnections(msg.from);
                    for (UserConnection uc : users) {
                        if (uc == null || uc.session == null || !uc.session.isOpen()) {
                            continue;
                        }
                        if (uc.session.equals(userSession)) {
                            Util.addDebugLog("----> Web socket: add message to OUTBOX");
                            isValidSession = true;
                            uc.outbox.add(msg);
                            break;
                        }
                    }
                    if (!isValidSession) {
                        userSession.close();
                    }
                    break;
                }
            }
        } catch (IOException | ParseException ex) {
            Util.addErrorLog(ex);
        }
    }

}
