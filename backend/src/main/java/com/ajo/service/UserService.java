package com.ajo.service;

import org.springframework.stereotype.Service;
import com.ajo.dto.UserRegisterRequest;
import com.ajo.dto.UserResponse;
import com.ajo.entity.User;
import com.ajo.repository.UserRepository;
import com.ajo.exception.EmailAlreadyExistsException;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Buiness logic- checking if email already exist using before pasing in a UserRegisterRequest to creat a user then a userResponse object
    public UserResponse createUser(UserRegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isEmpty()) {
            User newUser = new User();
            newUser.setEmail(request.getEmail());
            newUser.setFirstName(request.getFirstName());
            newUser.setLastName(request.getLastName());
            newUser.setPassword(request.getPassword());
            User storeUser =  userRepository.save(newUser);
            
            UserResponse userResponse = new UserResponse(storeUser.getId(), storeUser.getEmail(), storeUser.getFirstName(), storeUser.getLastName());
            return userResponse;
            
        } else {
            throw new EmailAlreadyExistsException("This email is already registered");
        }
    
    }
   
    
    
   
    
}
