package com.ajo.entity;

import java.util.UUID;

import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String email;
    private String userName;
    private String password;

    public User (String email, String userName, String password) {
        this.email = email;
        this.userName = userName;
        this.password = password;

        
    }

    public User() {
        this(null, null, null);
    }
    
}
