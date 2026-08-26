package com.ajo.service;

import org.springframework.stereotype.Service;

import com.ajo.repository.CircleRepository;
import com.ajo.repository.UserRepository;

@Service
public class CircleService {

    public final CircleRepository circleRepository;
    public final UserRepository userRepository;

    public CircleService (CircleRepository circleRepository, UserRepository userRepository) {
        this.circleRepository = circleRepository;
        this.userRepository = userRepository;
    }

    public 

    
}
