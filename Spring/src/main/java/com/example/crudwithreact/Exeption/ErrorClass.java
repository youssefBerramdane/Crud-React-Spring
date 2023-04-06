package com.example.crudwithreact.Exeption;

import org.springframework.http.HttpStatus;

public class ErrorClass {
    private String Message;
    private HttpStatus status;

    public ErrorClass(String message, HttpStatus status) {
        Message = message;
        this.status = status;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
