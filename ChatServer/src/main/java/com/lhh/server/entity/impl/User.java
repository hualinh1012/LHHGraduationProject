/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.entity.impl;

import com.lhh.server.entity.IEntity;
import com.lhh.util.ServerException;
import com.lhh.util.Util;
import com.lhh.util.constant.ResponseCode;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.bson.Document;
import org.json.simple.JSONObject;

/**
 *
 * @author Linh
 */
public class User implements IEntity {

    public static final String ID = "_id";
    public static final String USER_ID = "user_id";
    public String userId;

    public static final String USER_NAME = "user_name";
    public String userName;

    public static final String SORT_NAME = "sort_name";
    public String sortName;

    public static final String EMAIL = "email";
    public String email;

    public static final String ORIGINAL_PASSWORD = "original_pwd";
    public String originalPassword;

    public static final String PASSWORD = "pwd";
    public String password;

    public static final String GENDER = "gender";
    public Integer gender;

    public static final String DATE_OF_BIRTH = "dob";
    public String dateOfBirth;

    public static final String PHONE_NUMBER = "phone_number";
    public String phoneNumber;

    public static final String AVATAR_ID = "avatar_id";
    public String avatarId;

    public static final String REGISTER_DATE = "register_date";
    public String registerDate;
    
    public User() {
    }

    public User(String userName, String email, String originalPassword, String password, Integer gender, String dateOfBirth) {
        this.userName = userName;
        this.email = email;
        this.originalPassword = originalPassword;
        this.password = password;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }

    public User(String userId, String userName, String email, String originalPassword, String password, Integer gender, String dateOfBirth) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.originalPassword = originalPassword;
        this.password = password;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }

    public User(String userId, String userName, Integer gender, String dateOfBirth, String phoneNumber, String avatarId) {
        this.userId = userId;
        this.userName = userName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.avatarId = avatarId;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jo = new JSONObject();
        if (userId != null) {
            jo.put(USER_ID, userId);
        }
        if (userName != null) {
            jo.put(USER_NAME, userName);
        }
        if (email != null) {
            jo.put(EMAIL, email);
        }
        if (gender != null) {
            jo.put(GENDER, gender);
        }
        if (dateOfBirth != null) {
            jo.put(DATE_OF_BIRTH, dateOfBirth);
        }
        if (avatarId != null) {
            jo.put(AVATAR_ID, avatarId);
        }
        return jo;
    }
    
    public static User fromDBObject(Document doc) {
        User user = new User();
        user.userId = doc.getObjectId(ID).toString();
        user.userName = doc.getString(USER_NAME);
        user.email = doc.getString(EMAIL);
        user.gender = doc.getInteger(GENDER);
        user.dateOfBirth = doc.getString(DATE_OF_BIRTH);
        user.phoneNumber = doc.getString(PHONE_NUMBER);
        user.avatarId = doc.getString(AVATAR_ID);
        user.registerDate = doc.getString(REGISTER_DATE);
        return user;
    }

    public boolean validateRegister() throws ServerException {
        if (userName == null || userName.isEmpty()) {
            throw new ServerException(ResponseCode.WRONG_DATA_FORMAT);
        }
        if (gender < 0 || gender > 1) {
            throw new ServerException(ResponseCode.WRONG_DATA_FORMAT);
        }
        if (userName.length() > 32) {
            throw new ServerException(ResponseCode.INVALID_USER_NAME);
        }
        if (!validateEmail(email)) {
            throw new ServerException(ResponseCode.INVALID_EMAIL);
        }
        if (!validateBirthday(dateOfBirth)) {
            throw new ServerException(ResponseCode.INVALID_DATE_OF_BIRTH);
        }
        return true;
    }

    public boolean validateUpdateUser() throws ServerException {
        if (userName == null || userName.isEmpty()) {
            throw new ServerException(ResponseCode.WRONG_DATA_FORMAT);
        }
        if (gender < 0 || gender > 1) {
            throw new ServerException(ResponseCode.WRONG_DATA_FORMAT);
        }
        if (userName.length() > 32) {
            throw new ServerException(ResponseCode.INVALID_USER_NAME);
        }
        if (!validateBirthday(dateOfBirth)) {
            throw new ServerException(ResponseCode.INVALID_DATE_OF_BIRTH);
        }
        return true;
    }
       

    private static final String EMAIL_REGEX = "^([0-9a-zA-Z!#$%&`*+-\\/=?^_'.{}|~]+@)((\\[(\\d{1,3}\\.){3}\\d{1,3}\\])|(([0-9a-zA-Z-]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,6}))$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public static boolean validateEmail(String email) {
        if (email == null) {
            return false;
        }
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

    public static boolean validateBirthday(String dob) {
        if (dob == null) {
            return true;
        }
        if (dob.length() != 10) {
            return false;
        }
        int age = Util.convertBirthdayToAge(dob);
        return age < 100 && age > 0;
    }

}
