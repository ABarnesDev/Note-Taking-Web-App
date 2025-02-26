package com.notes.server.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserException extends RuntimeException {
    private final HttpStatus status;
    public UserException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
