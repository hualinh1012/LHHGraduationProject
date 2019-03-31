/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.messageio;

import com.lhh.server.chatserver.connection.UserConnection;
import com.lhh.server.chatserver.connection.UserConnectionStorage;
import com.lhh.server.entity.impl.Message;
import com.lhh.util.DateFormat;
import com.lhh.util.Util;

/**
 *
 * @author Linh Hua
 */
public class MessageOutput implements Runnable {

    @Override
    public void run() {
        while (true) {
            try {
                UserConnection uc = UserConnectionStorage.poll();
                if (uc != null) {
                    processInBox(uc);
                    processOutBox(uc);
                    UserConnectionStorage.putConnection(uc);
                }
                else {
                    sleep();
                }
            } catch (Exception e) {
                Util.addErrorLog(e);
            }
        }
    }

    private void processInBox(UserConnection uc) {

    }

    private void processOutBox(UserConnection uc) {
        if (uc.outbox.isEmpty()){
            return;
        }
        
        for (int i = 0; i < uc.outbox.size(); i++){
            Message msg = uc.outbox.poll();
            if (msg == null) {
                continue;
            }
            msg.time = DateFormat.format(Util.currentTime());
        }
    }
    
    private void sleep() {
        try {
            Thread.sleep(10);
        } catch (InterruptedException ex) {
            Util.addErrorLog(ex);
        }
    }

}
