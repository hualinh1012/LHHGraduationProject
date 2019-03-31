/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver;

import com.lhh.core.Config;
import com.lhh.server.apiserver.handler.ServerHandler;
import com.lhh.util.Util;
import org.eclipse.jetty.server.Server;

/**
 *
 * @author Linh
 */
public class WebAPIServer implements Runnable {

    public static void startServer() throws Exception {
        WebAPIServer server = new WebAPIServer();
        Thread t = new Thread(server);
        t.start();
    }

    @Override
    public void run() {
        try {
            Server server = new Server(Config.API_SERVER_PORT);
            server.setHandler(new ServerHandler());
            server.start();
            server.join();
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }
}
