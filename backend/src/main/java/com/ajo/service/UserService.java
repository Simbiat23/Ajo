package com.ajo.service;

import org.springframework.stereotype.Service;

import com.ajo.entity.User;
import com.ajo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }
    
}
