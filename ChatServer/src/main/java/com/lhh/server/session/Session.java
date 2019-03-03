/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.session;

import com.lhh.util.Util;
import com.lhh.util.constant.Constant;
import java.util.UUID;

/**
 *
 * @author Linh
 */
public class Session {

    private static final long SESSION_TIME_OUT_MILLISECONDS = Constant.A_DAY;

    public String token;
    public String userID;
    public long sessionExpire;

    public Session(String userID) {
        this.token = UUID.randomUUID().toString();
        this.userID = userID;
        this.sessionExpire = Util.currentTime() + SESSION_TIME_OUT_MILLISECONDS;
    }

    public void resetExpire() {
        this.sessionExpire = Util.currentTime() + SESSION_TIME_OUT_MILLISECONDS;
    }
}
