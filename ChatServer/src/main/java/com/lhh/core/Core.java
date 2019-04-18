/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.core;

import com.lhh.dao.MongoConnection;
import com.lhh.server.apiserver.WebAPIServer;
import com.lhh.server.chatserver.WebSocketServer;
import com.lhh.util.Util;

/**
 *
 * @author Linh
 */
public class Core {
    public static void main(String[] args) throws Exception {
        Util.addDebugLog("Server folder: " + System.getProperty("user.dir"));
        Config.initConfig();
        Util.addDebugLog("Initiate MongoDB connection....");
        MongoConnection.init();
        Util.addDebugLog("Server is starting....");
        Util.addDebugLog("Socket Server is starting....");
        WebSocketServer.startServer();
        Util.addDebugLog("API Server is starting....");
        WebAPIServer.startServer();
        Util.addDebugLog("DONE! Server is started");
    }
    
}
