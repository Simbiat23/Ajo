package com.ajo.exception;

public class InvalidLoginException extends RuntimeException{
     public InvalidLoginException(String message) {
        super(message);
    }
}
