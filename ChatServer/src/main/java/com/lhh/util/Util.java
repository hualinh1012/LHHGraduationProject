/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util;

import com.lhh.util.logger.DailyLogger;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.TimeZone;
import javax.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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

    public static String getClientIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public static int convertBirthdayToAge(String time) {
        int age = 0;
        if (time != null) {
            age = 0;
            Date bir = DateFormat.parse_yyyy_MM_dd(time);
            Date now = new Date();
            age = now.getYear() - bir.getYear();
            int nowMonth = now.getMonth();
            int nowDay = now.getDate();
            int birMonth = bir.getMonth();
            int birDay = bir.getDate();
            if (nowMonth < birMonth || (nowMonth == birMonth && nowDay < birDay)) {
                age--;
            }
        }
        return age;
    }

    public static String byteToString(byte[] b) {
        int n = b.length;
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < n; i++) {
            builder.append((char) b[i]);
        }
        return builder.toString();
    }

    public static String convertPasswordToMD5(String password) {
        String result = "";
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            byte[] b = messageDigest.digest(password.getBytes());
            result = byteToString(b);
        } catch (NoSuchAlgorithmException ex) {
        } catch (Exception ex) {
        }
        return result;
    }

    public static JSONObject fromJSONObject(String jsonString) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(jsonString);
        return json;
    }    
}
