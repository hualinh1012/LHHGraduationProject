/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver;

import com.lhh.core.Config;
import com.lhh.server.chatserver.messageio.MessageInput;
import com.lhh.server.chatserver.messageio.MessageOutput;

/**
 *
 * @author Linh
 */
public class WebSocketServer {

    public static void startServer() {
        MessageInput input = new MessageInput();
        Thread in = new Thread(input);
        in.start();

        for (int i = 0; i < Config.WEB_SOCKET_OUTPUT_WORKER; i++) {
            MessageOutput output = new MessageOutput();
            Thread out = new Thread(output);
            out.start();
        }
    }

}
