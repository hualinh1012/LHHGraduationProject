/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver;

import com.lhh.core.Config;
import com.lhh.server.chatserver.messageio.MessageInput;
import com.lhh.util.Util;
import javax.websocket.DeploymentException;
import org.glassfish.tyrus.server.Server;

/**
 *
 * @author Linh
 */
public class WebSocketServer implements Runnable {

    public static void startServer() {
        WebSocketServer server = new WebSocketServer();
        Thread t = new Thread(server);
        t.start();
    }

    @Override
    public void run() {
        try {
            Server webSocketServer = new Server(Config.SERVER_HOST, Config.WEB_SOCKET_PORT, "/ws", null, MessageInput.class);
            webSocketServer.start();
        } catch (DeploymentException e) {
            Util.addErrorLog(e);
        }
    }

}
