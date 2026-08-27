package com.ajo.circle;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.ajo.user.UserRepository;

@Service
public class CircleService {

    private final CircleRepository circleRepository;
    private final UserRepository userRepository;

    public CircleService (CircleRepository circleRepository, UserRepository userRepository) {
        this.circleRepository = circleRepository;
        this.userRepository = userRepository;
    }

    public CircleResponse createCircle(CircleRequest request) {
        Circle newCircle = new Circle();
    
        newCircle.setName(request.getName());
        newCircle.setMaxMembers(request.getMaxMembers());
        newCircle.setContributionAmount(request.getContributionAmount());
        newCircle.setFrequency(request.getFrequency());
        newCircle.setStartDate(request.getStartDate());
        Random random = new Random();
        int number =  random.nextInt(1000);
        String inviteCode = "AJO-" + String.format("%04d", number);
        newCircle.setInviteCode(inviteCode);
        newCircle.setCurrentCycle(1);
     
        Circle storeCircle = circleRepository.save(newCircle);
        CircleResponse circleResponse = new CircleResponse(storeCircle.getId(), storeCircle.getName(), storeCircle.getContributionAmount(), storeCircle.getFrequency(), storeCircle.getMaxMembers(), storeCircle.getStartDate(), storeCircle.getInviteCode(), storeCircle.getCurrentCycle());

        return circleResponse;

    

        
    }

  



    
}
