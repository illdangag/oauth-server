package com.illdangag.oauth.service.exception;

public class DuplicateException extends Exception {
    public DuplicateException() {}

    public DuplicateException(String message) {
        super(message);
    }
}
