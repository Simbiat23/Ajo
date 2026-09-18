package com.ajo.user;

import org.springframework.stereotype.Service;

import com.ajo.exception.EmailAlreadyExistsException;
import com.ajo.exception.InvalidLoginException;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse userResponse(User user) {
        UserResponse userResponse = new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());

        return userResponse;
    }

    //Buiness logic- checking if email already exist before using the request to  create a User then a userResponse object
    public UserResponse createUser(UserRegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isEmpty()) {
            User newUser = new User();
            newUser.setEmail(request.getEmail());
            newUser.setFirstName(request.getFirstName());
            newUser.setLastName(request.getLastName());
            newUser.setPassword(request.getPassword());
            User storeUser =  userRepository.save(newUser);
            
            return userResponse(storeUser);
            
        } else {
            throw new EmailAlreadyExistsException("This email is already registered");
        }
    
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new InvalidLoginException("Invalid email or password"));

       if (user.getPassword().equals(request.getPassword())) {
            return userResponse(user);
        } else {
            throw new InvalidLoginException("Invalid email or password");
        }
    }
   
    
    
   
    
}
