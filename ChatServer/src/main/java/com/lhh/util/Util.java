/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util;

import com.lhh.util.logger.DailyLogger;
import java.util.Date;
import java.util.TimeZone;

/**
 *
 * @author Linh
 */
public class Util {
    
    public static void addDebugLog(String str) {
        DailyLogger.debug(str);
    }

    public static void addErrorLog(Exception ex) {
        DailyLogger.error(ex);
    }
    
    public static long currentTime() {
        TimeZone tz = TimeZone.getDefault();
        return System.currentTimeMillis() - tz.getRawOffset();
    }
    
    public static Date getGMT(long inputTime) {
        TimeZone tz = TimeZone.getDefault();
        long time = inputTime - tz.getRawOffset();
        Date d = new Date(time);
        return d;
    }

    public static Date getGMTTime() {
        Date d = new Date(currentTime());
        return d;
    }
}
