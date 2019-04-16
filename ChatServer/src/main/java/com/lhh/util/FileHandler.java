/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 *
 * @author Linh Hua
 */
public class FileHandler {

    public static String FILE_FOLDER;

    static {
        if (System.getProperty("os.name").startsWith("Windows")) {
            FILE_FOLDER = System.getProperty("user.dir") + "\\file\\";
        } else {
            FILE_FOLDER = System.getProperty("user.dir") + "/file/";
        }
    }

    public static byte[] getInputArrayByte(InputStream in) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] result = null;
        if (in == null) {
            return null;
        }
        try {
            byte[] buf = new byte[4096];
            while (true) {
                int n = in.read(buf);
                if (n < 0) {
                    break;
                }
                bos.write(buf, 0, n);
            }
            bos.flush();
            bos.close();
            result = bos.toByteArray();
        } catch (IOException ex) {
            Util.addErrorLog(ex);
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return result;
    }

    public static String getExtension(String fileName) {
        String result = "";
        int i = fileName.lastIndexOf('.');
        if (i > 0) {
            result = fileName.substring(i + 1);
        }
        return result;
    }

    public static String getName(String fileName) {
        String result = "";
        int i = fileName.lastIndexOf('.');
        if (i > 0) {
            result = fileName.substring(0, i);
        }
        return result;
    }

    public static String createUrlPath(String fileName, String fileType) {
        String filename = fileName + "-" + UUID.randomUUID().toString().substring(24) + "." + fileType;
        String dateString = DateFormat.format(Util.getGMTTime());
        StringBuilder monthYear = new StringBuilder();
        monthYear.append(dateString.substring(0, 4)).append(dateString.substring(4, 6));
        return monthYear.toString() + File.separator + dateString.subSequence(6, 8) + File.separator + filename;
    }

    public static String generateFile(byte[] arrayData, String fileName, String fileType) {
        String fileUrl = null;
        try {
            fileUrl = FileHandler.createUrlPath(fileName, fileType);
            File file = new File(FILE_FOLDER + fileUrl);
            if (file.exists()) {
                file.delete();
            }
            file.getParentFile().mkdirs();
            FileOutputStream outputStream = new FileOutputStream(file);
            outputStream.write(arrayData);
            outputStream.close();
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return fileUrl;
    }

}
