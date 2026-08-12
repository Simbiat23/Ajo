package com.ajo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajo.dto.UserRegisterRequest;
import com.ajo.dto.UserResponse;
import com.ajo.service.UserService;

@RestController
@RequestMapping("/ajo/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse createUser(@RequestBody UserRegisterRequest request) {
        return userService.createUser(request);
    }
    
}
