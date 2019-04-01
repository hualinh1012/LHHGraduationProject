/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver;

import com.lhh.core.Config;
import com.lhh.server.chatserver.logger.MessageLogger;
import com.lhh.server.chatserver.messageio.WebSocketEndPoint;
import com.lhh.server.chatserver.messageio.WebSocketWorker;

/**
 *
 * @author Linh
 */
public class WebSocketServer {

    public static void startServer() {

        for (int i = 0; i < Config.WEB_SOCKET_OUTPUT_WORKER; i++) {
            WebSocketWorker worker = new WebSocketWorker();
            Thread t = new Thread(worker);
            t.start();
        }
        
        WebSocketEndPoint server = new WebSocketEndPoint();
        Thread t1 = new Thread(server);
        t1.start();
        
        MessageLogger logger = new MessageLogger();
        Thread t2 = new Thread(logger);
        t2.start();
    }

}
