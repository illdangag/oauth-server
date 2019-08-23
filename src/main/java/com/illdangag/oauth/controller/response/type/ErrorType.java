package com.illdangag.oauth.controller.response.type;

public enum ErrorType {
    OAUTH_INVALID_GRANT             ("0000", "invalid grant"),
    OAUTH_INVALID_TOKEN             ("0001", "expired token"),
    USER_CREATE_INVALID_PROPERTY    ("1000", "invalid property"),
    USER_CREATE_DUPLICATED_USERNAME ("1001", "duplicated username"),
    USER_UPDATE_NOT_EXIST_USER      ("1002", "not exist user"),
    USER_UPDATE_INVALID_PROPERTY    ("1003", "invalid property"),
    UNKNOWN_ERROR                   ("9999", "unknown error");

    private String code;
    private String message;

    ErrorType(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
