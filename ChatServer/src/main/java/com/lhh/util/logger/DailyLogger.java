/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util.logger;

import com.lhh.core.Config;
import com.lhh.util.DateFormat;
import java.util.Date;
import org.apache.log4j.DailyRollingFileAppender;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

/**
 *
 * @author Linh
 */
public class DailyLogger {
    private static final Logger logger = Logger.getLogger("DailyLogger");
    
    static{
        // creates pattern layout
        PatternLayout layout = new PatternLayout();
        String conversionPattern = Config.LOG_PATTERN;
        layout.setConversionPattern(conversionPattern);
 
        // creates daily rolling file appender
        DailyRollingFileAppender rollingAppender = new DailyRollingFileAppender();
        rollingAppender.setFile(Config.LOG_FILE);
        rollingAppender.setDatePattern("'.'yyyy-MM-dd");
        rollingAppender.setLayout(layout);
        rollingAppender.activateOptions();
 
        // configures the root logger
        logger.setLevel(Level.toLevel(Config.LOG_LEVEL));
        logger.addAppender(rollingAppender);    
    }
    
    private static String completeMessage(String str){
        StringBuilder sb = new StringBuilder("At ");
        sb.append(DateFormat.format_yyyyMMddHHmmssSSS(new Date()));
        sb.append(" : ");
        sb.append(str);
        return sb.toString();
    }    
    
    public static void debug(String message){
        System.out.println(message);
//        String inforMessage = completeMessage(message);
//        logger.debug(inforMessage);
    }
    
    public static void error(Throwable t){
//        logger.error("At " + DateFormat.format_yyyyMMddHHmmssSSS(new Date()), t);
    }
    
    public static void info(String message){
        String inforMessage = completeMessage(message);
        logger.info(inforMessage);
    }
}
