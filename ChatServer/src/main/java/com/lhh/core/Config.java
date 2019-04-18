/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.core;

import com.lhh.util.Util;
import java.io.FileInputStream;
import java.util.Properties;

/**
 *
 * @author Linh
 */
public class Config {

    public static String LOG_LEVEL = "DEBUG";
    public static String LOG_FILE = "Server.log";
    public static String LOG_PATTERN = "[%p] %m%n";

    public static String API_SERVER_HOST = "localhost";
    public static int API_SERVER_PORT = 8080;

    public static String WEBSOCKET_SERVER_HOST = "localhost";
    public static int WEBSOCKET_SERVER_PORT = 8081;

    public static String DB_SERVER_HOST = "localhost";
    public static int DB_SERVER_PORT = 27017;
        
    public static String STREAMING_HOST = "localhost";

    public static int WEB_SOCKET_OUTPUT_WORKER = 5;
    
    public static void initConfig(){
        try{
            FileInputStream fis = new FileInputStream( "Config.properties" );
            Properties prop = new Properties();
            prop.load( fis );
            
            API_SERVER_HOST = prop.getProperty("API_SERVER_HOST", "localhost").trim();
            API_SERVER_PORT = Integer.parseInt(prop.getProperty("API_SERVER_PORT", "8080").trim());
            
            WEBSOCKET_SERVER_HOST = prop.getProperty("WEBSOCKET_SERVER_HOST", "localhost").trim();
            WEBSOCKET_SERVER_PORT = Integer.parseInt(prop.getProperty("WEBSOCKET_SERVER_PORT", "8081").trim());
            
            DB_SERVER_HOST = prop.getProperty("DB_SERVER_HOST", "localhost").trim();
            DB_SERVER_PORT = Integer.parseInt(prop.getProperty("DB_SERVER_PORT", "27017").trim());
            
            STREAMING_HOST = prop.getProperty("STREAMING_HOST", "localhost").trim();
            
            WEB_SOCKET_OUTPUT_WORKER = Integer.parseInt(prop.getProperty("WEB_SOCKET_OUTPUT_WORKER", "5").trim());
            
        } catch( Exception ex ) {
            Util.addErrorLog(ex); 
        }
    }
}
