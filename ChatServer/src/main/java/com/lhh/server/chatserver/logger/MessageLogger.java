/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.chatserver.logger;

import com.lhh.dao.impl.user.ChatLogDAO;
import com.lhh.dao.impl.user.ConversationDAO;
import com.lhh.server.entity.impl.Message;
import com.lhh.util.Util;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 *
 * @author Linh Hua
 */
public class MessageLogger implements Runnable{
    
    private static final Queue<Message> MESSAGE_QUEUE = new ConcurrentLinkedQueue<Message>();
    
    public static void log(Message msg){
        MESSAGE_QUEUE.add(msg);
    }
        
    @Override
    public void run() {
        while(true){
            Message msg = MESSAGE_QUEUE.poll();
            if (msg != null){
                ChatLogDAO.addLog(msg);
                ConversationDAO.updateConversation(msg);
            }
            else {
                sleep();
            }
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
