/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util;

import java.util.Date;

/**
 *
 * @author Linh
 */
public class DateFormat {
    private static final int JAVA_DATE_START_YEAR = 1900;

    public static Date parse(String yyyyMMddHHmmss) {
        if (yyyyMMddHHmmss == null || yyyyMMddHHmmss.isEmpty()) {
            return null;
        }
        try {
            int year = Integer.parseInt(yyyyMMddHHmmss.substring(0, 4));
            year -= JAVA_DATE_START_YEAR;
            int month = Integer.parseInt(yyyyMMddHHmmss.substring(4, 6));
            month--;
            int date = Integer.parseInt(yyyyMMddHHmmss.substring(6, 8));
            int hour = Integer.parseInt(yyyyMMddHHmmss.substring(8, 10));
            int min = Integer.parseInt(yyyyMMddHHmmss.substring(10, 12));
            int second = Integer.parseInt(yyyyMMddHHmmss.substring(12, 14));
            Date d = new Date(year, month, date, hour, min, second);
            return d;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return parseBackup(yyyyMMddHHmmss);
        }
    }

    public static Date parse_yyyyMMddHHmmssSSS( String yyyyMMddHHmmssSSS ){
        if( yyyyMMddHHmmssSSS == null || yyyyMMddHHmmssSSS.isEmpty() ) return null;
        try{
            int year = Integer.parseInt( yyyyMMddHHmmssSSS.substring( 0, 4 ) );
            year -= JAVA_DATE_START_YEAR;
            int month =  Integer.parseInt( yyyyMMddHHmmssSSS.substring( 4, 6 ) );
            month--;
            int date = Integer.parseInt( yyyyMMddHHmmssSSS.substring( 6, 8 ) );
            int hour = Integer.parseInt( yyyyMMddHHmmssSSS.substring( 8, 10 ) );
            int min = Integer.parseInt( yyyyMMddHHmmssSSS.substring( 10, 12 ) );
            int second = Integer.parseInt( yyyyMMddHHmmssSSS.substring( 12, 14 ) );
            int millisecond = 0;
            
            Date d = new Date( year, month, date, hour, min, second );
            d.setTime( d.getTime() + millisecond );
            
            return d;
        } catch( Exception ex ) {
            Util.addErrorLog(ex);  
            return parseBackup( yyyyMMddHHmmssSSS );
        }
    }   
    
    public static Date parse_yyyyMMdd(String yyyyMMdd) {
        if (yyyyMMdd == null || yyyyMMdd.isEmpty()) {
            return null;
        }
        try {
            int year = Integer.parseInt(yyyyMMdd.substring(0, 4));
            year -= JAVA_DATE_START_YEAR;
            int month = Integer.parseInt(yyyyMMdd.substring(4, 6));
            month--;
            int date = Integer.parseInt(yyyyMMdd.substring(6, 8));
            Date d = new Date(year, month, date);
            return d;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return Util.getGMTTime();
        }
    }
    
    public static Date parse_yyyy_MM_dd(String yyyyMMdd) {
        if (yyyyMMdd == null || yyyyMMdd.isEmpty()) {
            return null;
        }
        try {
            int year = Integer.parseInt(yyyyMMdd.substring(0, 4));
            year -= JAVA_DATE_START_YEAR;
            int month = Integer.parseInt(yyyyMMdd.substring(5, 7));
            month--;
            int date = Integer.parseInt(yyyyMMdd.substring(8, 10));
            Date d = new Date(year, month, date);
            return d;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return Util.getGMTTime();
        }
    }
    
    private static Date parseBackup(String yyyyMMddHHmmss) {
        if (yyyyMMddHHmmss == null) {
            return null;
        }
        try {
            int year = Integer.parseInt(yyyyMMddHHmmss.substring(0, 4));
            year -= JAVA_DATE_START_YEAR;
            int month = Integer.parseInt(yyyyMMddHHmmss.substring(4, 6));
            month--;
            int date = Integer.parseInt(yyyyMMddHHmmss.substring(6, 8));
            int hour = Integer.parseInt(yyyyMMddHHmmss.substring(8, 10));
            int min = Integer.parseInt(yyyyMMddHHmmss.substring(10, 12));
            int second = Integer.parseInt(yyyyMMddHHmmss.substring(12, 14));

            Date d = new Date(year, month, date, hour, min, second);

            return d;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            return Util.getGMTTime();
        }
    }
    
    public static Date parse_yyyy_MM_dd_HH_mm_ss( String yyyyMMddHHmmss ){
        if( yyyyMMddHHmmss == null || yyyyMMddHHmmss.isEmpty() ) return null;
        try{
            int year = Integer.parseInt( yyyyMMddHHmmss.substring( 0, 4 ) );
            year -= JAVA_DATE_START_YEAR;
            int month =  Integer.parseInt( yyyyMMddHHmmss.substring( 5, 7 ) );
            month--;
            int date = Integer.parseInt( yyyyMMddHHmmss.substring( 8, 10 ) );
            int hour = Integer.parseInt( yyyyMMddHHmmss.substring( 11, 13 ) );
            int min = Integer.parseInt( yyyyMMddHHmmss.substring( 14, 16 ) );
            int second = Integer.parseInt( yyyyMMddHHmmss.substring( 17, 19 ) );
            Date d = new Date( year, month, date, hour, min, second );
            return d;
        } catch( Exception ex ) {
            Util.addErrorLog(ex);  
            return parseBackup( yyyyMMddHHmmss );
        }
    } 
    private static final String Zero = "0";
    
    public static String format_yyyyMMddHHmmssSSS( Date d ){
        if( d == null ) return null;
        StringBuilder buidler = new StringBuilder()
                .append( d.getYear() + JAVA_DATE_START_YEAR )
                .append( format2DNumber( d.getMonth() + 1) ) 
                .append( format2DNumber( d.getDate() ) )
                .append( format2DNumber( d.getHours() ) )
                .append( format2DNumber( d.getMinutes() ) )
                .append( format2DNumber( d.getSeconds() ) )
                .append( getMillisecond( d ) );
        return buidler.toString();
    }

    public static String format_yyyyMMddHHmmssSSS( long date ){
        return format_yyyyMMddHHmmssSSS( new Date( date ) );
    }    
    
    public static String format_yyyyMMddHHmm(Date date){
        if( date == null ) return null;
        StringBuilder buidler = new StringBuilder()
                .append( date.getYear() + JAVA_DATE_START_YEAR )
                .append( format2DNumber( date.getMonth() + 1) ) 
                .append( format2DNumber( date.getDate() ) )
                .append( format2DNumber( date.getHours() ) )
                .append( format2DNumber( date.getMinutes() ) );
        return buidler.toString();        
    }
    
    public static String format_yyyyMMddHHmm(Long date){
        return format_yyyyMMddHHmm(new Date(date));
    }
    
    private static String getMillisecond( Date d ){
        int n = (int) ( d.getTime() % 1000 );
        n = n < 0 ? n + 1000 : n;
        return format3DNumber( n );
    }
    public static String format(Date d) {
        if (d == null) {
            return null;
        }
        StringBuilder buidler = new StringBuilder()
                .append(d.getYear() + JAVA_DATE_START_YEAR)
                .append(format2DNumber(d.getMonth() + 1))
                .append(format2DNumber(d.getDate()))
                .append(format2DNumber(d.getHours()))
                .append(format2DNumber(d.getMinutes()))
                .append(format2DNumber(d.getSeconds()));
        return buidler.toString();
    }     
    
    public static String format(long date) {
        return format(new Date(date));
    }

    private static String format2DNumber(int n) {
        return n > 9 ? String.valueOf(n) : (Zero + n);
    }

    private static String format3DNumber(int n) {
        return n < 10 ? String.valueOf(Zero + Zero + n) : (n < 100) ? String.valueOf(Zero + n) : String.valueOf(n);
    }

    public static String formatCsvName(Date d) {
        if (d == null) {
            return null;
        }
        StringBuilder buidler = new StringBuilder()
                .append(d.getYear() + JAVA_DATE_START_YEAR)
                .append(format2DNumber(d.getDate()))
                .append(format2DNumber(d.getMonth() + 1))
                .append(format2DNumber(d.getHours()))
                .append(format2DNumber(d.getMinutes()))
                .append(format2DNumber(d.getSeconds()))
                .append( getMillisecond( d ) );

        return buidler.toString();
    }

    public static String format_yyyyMMdd(Date d) {
        if (d == null) {
            return null;
        }
        StringBuilder buidler = new StringBuilder()
                .append(d.getYear() + JAVA_DATE_START_YEAR)
                .append(format2DNumber(d.getMonth() + 1))
                .append(format2DNumber(d.getDate()));
        return buidler.toString();
    }
    
    public static String format_yyyy_MM_dd(Date d) {
        if (d == null) {
            return null;
        }
        StringBuilder buidler = new StringBuilder()
                .append(d.getYear() + JAVA_DATE_START_YEAR)
                .append("_")
                .append(format2DNumber(d.getMonth() + 1))
                .append("_")
                .append(format2DNumber(d.getDate()));
        return buidler.toString();
    }
    public static String format_yyyyMMddHH(Date d) {
        if (d == null) {
            return null;
        }
        StringBuilder buidler = new StringBuilder()
                .append(d.getYear() + JAVA_DATE_START_YEAR)
                .append(format2DNumber(d.getMonth() + 1))
                .append(format2DNumber(d.getDate()))
                .append(format2DNumber(d.getHours()));
        return buidler.toString();
    }
    
     public static Date parse_yyyyMMddHHmm( String yyyyMMddHHmmss ){
        if( yyyyMMddHHmmss == null || yyyyMMddHHmmss.isEmpty() ) return null;
        try{
            int year = Integer.parseInt( yyyyMMddHHmmss.substring( 0, 4 ) );
            year -= JAVA_DATE_START_YEAR;
            int month =  Integer.parseInt( yyyyMMddHHmmss.substring( 4, 6 ) );
            month--;
            int date = Integer.parseInt( yyyyMMddHHmmss.substring( 6, 8 ) );
            int hour = Integer.parseInt( yyyyMMddHHmmss.substring( 8, 10 ) );
            int min = Integer.parseInt( yyyyMMddHHmmss.substring( 10, 12 ) );
            Date d = new Date( year, month, date, hour, min );
            
            return d;
        } catch( Exception ex ) {
            Util.addErrorLog(ex);  
            return parseBackup( yyyyMMddHHmmss );
        }
    }    
     
     public static String formatCsv( Date d ){
        if( d == null ) return null;
        StringBuilder buidler = new StringBuilder()
                .append( d.getYear() + JAVA_DATE_START_YEAR )
                .append("-")
                .append( format2DNumber( d.getMonth() + 1) )
                .append("-")
                .append( format2DNumber( d.getDate() ) )
                .append(" ")
                .append( format2DNumber( d.getHours() ) )
                .append(":")
                .append( format2DNumber( d.getMinutes() ) )
                .append(":")
                .append( format2DNumber( d.getSeconds() ) );
        return buidler.toString();
    }   
}
