package com.notes.server.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidPasswordException extends UserException {
    public InvalidPasswordException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
