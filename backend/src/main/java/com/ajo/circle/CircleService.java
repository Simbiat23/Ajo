package com.ajo.circle;

import org.springframework.stereotype.Service;

import com.ajo.user.UserRepository;

@Service
public class CircleService {

    public final CircleRepository circleRepository;
    public final UserRepository userRepository;

    public CircleService (CircleRepository circleRepository, UserRepository userRepository) {
        this.circleRepository = circleRepository;
        this.userRepository = userRepository;
    }



    
}
