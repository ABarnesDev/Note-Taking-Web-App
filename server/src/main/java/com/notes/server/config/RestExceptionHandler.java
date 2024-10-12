package com.notes.server.config;

import com.notes.server.exceptions.UserException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {

    // Handle all UserException errors
    @ExceptionHandler(value = { UserException.class })
    public ResponseEntity<Map<String, String>> handleException(UserException ex) {
        HashMap<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());

        return ResponseEntity
                .status(ex.getStatus())
                .body(errorResponse);
    }

    // Handle all MethodArgumentNotValidException errors
    @ExceptionHandler(value = {MethodArgumentNotValidException.class })
    public ResponseEntity<Map<String, String>> handleException(MethodArgumentNotValidException ex) {

        ObjectError error = ex.getBindingResult().getAllErrors().getFirst();
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();

        HashMap<String, String> errorResponse = new HashMap<>();
        errorResponse.put(fieldName, errorMessage);

        return ResponseEntity
                .status(ex.getStatusCode())
                .body(errorResponse);
    }
}
