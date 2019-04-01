/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.core;

/**
 *
 * @author Linh
 */
public class Config {

    public static String LOG_LEVEL = "DEBUG";
    public static String LOG_FILE = "ChatServer.log";
    public static String LOG_PATTERN = "[%p] %m%n";

    public static String API_SERVER_HOST = "localhost";
    public static int API_SERVER_PORT = 8080;

    public static String WEBSOCKET_SERVER_HOST = "localhost";
    public static int WEB_SOCKET_PORT = 8081;

    public static String DB_SERVER_HOST = "10.64.100.31";
    public static int DB_PORT = 27017;

    public static int WEB_SOCKET_OUTPUT_WORKER = 5;

}
