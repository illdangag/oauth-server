package com.illdangag.oauth.controller.response.type;

public enum ErrorType {
    USER_CREATE_INVALID_PROPERTY        ("1000", ErrorMessage.INVALID_PROPERTY),
    USER_CREATE_DUPLICATED_USERNAME     ("1001", "duplicated username"),
    USER_READ_INVALID_PROPERTY          ("1002", ErrorMessage.INVALID_PROPERTY),
    USER_READ_NOT_EXIST_USER            ("1003", ErrorMessage.NOT_EXIST_USER),
    USER_UPDATE_NOT_EXIST_USER          ("1004", ErrorMessage.NOT_EXIST_USER),
    USER_UPDATE_INVALID_PROPERTY        ("1005", ErrorMessage.INVALID_PROPERTY),
    USER_DELETE_INVALID_PROPERTY        ("1006", ErrorMessage.INVALID_PROPERTY),
    USER_DELETE_NOT_EXIST_USER          ("1007", ErrorMessage.NOT_EXIST_USER),
    USER_DELETE_NO_PERMISSION           ("1008", ErrorMessage.NO_PERMISSION),

    CLIENT_CREATE_INVALID_PROPERTY      ("2000", ErrorMessage.INVALID_PROPERTY),
    CLIENT_CREATE_DUPLICATED_CLIENT_ID  ("2001", "duplicated client id"),
    CLIENT_READ_INVALID_PROPERTY        ("2002", ErrorMessage.INVALID_PROPERTY),
    CLIENT_READ_NOT_EXIST_CLIENT        ("2003", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_UPDATE_INVALID_PROPERTY      ("2004", ErrorMessage.INVALID_PROPERTY),
    CLIENT_UPDATE_NOT_EXIST_CLIENT      ("2005", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_DELETE_INVALID_PROPERTY      ("2006", ErrorMessage.INVALID_PROPERTY),
    CLIENT_DELETE_NOT_EXIST_CLIENT      ("2007", ErrorMessage.NOT_EXIST_CLIENT),
    CLIENT_DELETE_NO_PERMISSION         ("2008", ErrorMessage.NO_PERMISSION),

    UNKNOWN_ERROR                       ("9999", "unknown error");

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
    private ErrorMessage() {}
    static final String INVALID_PROPERTY = "invalid property";
    static final String NOT_EXIST_USER = "not exist user";
    static final String NO_PERMISSION = "no permission";
    static final String NOT_EXIST_CLIENT = "not exist client";
}