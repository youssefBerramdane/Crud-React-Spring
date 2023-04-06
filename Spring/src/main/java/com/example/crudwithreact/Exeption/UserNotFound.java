package com.example.crudwithreact.Exeption;

public class UserNotFound extends  RuntimeException{
    public UserNotFound() {
    }

    public UserNotFound(String message) {
        super(message);
    }
}
