package com.ajo.user;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:8081"})
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

    @PostMapping ("/login") 
    public UserResponse loginUser(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
    
}
