/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util;

/**
 *
 * @author Linh
 */
public class ServerException extends Exception {

    private int errorCode;

    public ServerException(int message) {
        super(String.valueOf(message));
        this.errorCode = message;
    }

    public ServerException(Throwable cause) {
        super(cause);
    }

    public int getErrorCode() {
        return errorCode;
    }
}
