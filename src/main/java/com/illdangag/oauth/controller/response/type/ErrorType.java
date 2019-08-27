package com.illdangag.oauth.controller.response.type;

public enum ErrorType {
    USER_CREATE_INVALID_PROPERTY        ("1000", ErrorMessage.INVALID_PROPERTY),
    USER_CREATE_DUPLICATED_USERNAME     ("1000", "duplicated username"),
    USER_READ_INVALID_PROPERTY          ("1000", ErrorMessage.INVALID_PROPERTY),
    USER_READ_NOT_EXIST_USER            ("1000", ErrorMessage.NOT_EXIST_USER),
    USER_UPDATE_NOT_EXIST_USER          ("1000", ErrorMessage.NOT_EXIST_USER),
    USER_UPDATE_INVALID_PROPERTY        ("1000", ErrorMessage.INVALID_PROPERTY),
    USER_DELETE_INVALID_PROPERTY        ("1000", ErrorMessage.INVALID_PROPERTY),
    USER_DELETE_NOT_EXIST_USER          ("1000", ErrorMessage.NOT_EXIST_USER),
    USER_DELETE_NO_PERMISSION           ("1000", ErrorMessage.NO_PERMISSION),

    CLIENT_CREATE_INVALID_PROPERTY      ("2000", ErrorMessage.INVALID_PROPERTY),
    CLIENT_CREATE_DUPLICATED_CLIENT_ID  ("2000", "duplicated client id"),
    CLIENT_READ_INVALID_PROPERTY        ("2000", ErrorMessage.INVALID_PROPERTY),
    CLIENT_READ_NOT_EXIST_CLIENT        ("2000", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_UPDATE_INVALID_PROPERTY      ("2000", ErrorMessage.INVALID_PROPERTY),
    CLIENT_UPDATE_NOT_EXIST_CLIENT      ("2000", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_DELETE_INVALID_PROPERTY      ("2000", ErrorMessage.INVALID_PROPERTY),
    CLIENT_DELETE_NOT_EXIST_CLIENT      ("2000", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_DELETE_NO_PERMISSION         ("2000", ErrorMessage.NO_PERMISSION),

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

class ErrorMessage {
    static final String INVALID_PROPERTY = "invalid property";
    static final String NOT_EXIST_USER = "not exist user";
    static final String NO_PERMISSION = "no permission";
    static final String NOT_EXIST_CLIENT = "not exist client";
}