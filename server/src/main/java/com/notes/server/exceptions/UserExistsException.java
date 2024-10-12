package com.notes.server.exceptions;

import org.springframework.http.HttpStatus;

public class UserExistsException extends UserException {
    public UserExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
