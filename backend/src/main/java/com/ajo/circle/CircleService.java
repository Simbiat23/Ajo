package com.ajo.circle;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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

    public CircleResponse circleResponse (Circle circle){
        CircleResponse circleResponse = new CircleResponse(circle.getId(), circle.getName(), circle.getContributionAmount(), circle.getFrequency(), circle.getMaxMembers(), circle.getStartDate(), circle.getInviteCode(), circle.getCurrentCycle());
        return circleResponse;


    }

    public String generateInviteCode () {
        Random random = new Random();
        int number =  random.nextInt(1000);
        String inviteCode = "AJO-" + String.format("%04d", number);
        return inviteCode;
    }


    public CircleResponse createCircle(CircleRequest request) {
        Circle newCircle = new Circle();
    
        newCircle.setName(request.getName());
        newCircle.setMaxMembers(request.getMaxMembers());
        newCircle.setContributionAmount(request.getContributionAmount());
        newCircle.setFrequency(request.getFrequency());
        newCircle.setStartDate(request.getStartDate());
        newCircle.setInviteCode(generateInviteCode());
        newCircle.setCurrentCycle(1);
     
        Circle storeCircle = circleRepository.save(newCircle);
        CircleResponse circleResponse = circleResponse(storeCircle);

        return circleResponse;

        
    }

    public List<CircleResponse> getAllCircles() {
        List<CircleResponse> listOfCircle = new ArrayList<>();
        for (Circle circle: circleRepository.findAll()) {
            CircleResponse eachCircle = circleResponse(circle);
            listOfCircle.add(eachCircle);

        }
        return listOfCircle;
    
    }

    public CircleResponse getCircleById(Long id)throws NoSuchElementException {
        Circle circle = circleRepository.findById(id).orElseThrow();
        CircleResponse aCircle = circleResponse(circle);
        return aCircle;
    

    }

    public CircleResponse updateCircle(Long id, CircleRequest circleRequest) {
        Circle existingCircle = circleRepository.findById(id).orElseThrow();
        existingCircle.setContributionAmount(circleRequest.getContributionAmount());
        existingCircle.setName(circleRequest.getName());
        existingCircle.setFrequency(circleRequest.getFrequency());
        existingCircle.setMaxMembers(circleRequest.getMaxMembers());
        existingCircle.setStartDate(circleRequest.getStartDate());

        Circle updatedCircle = circleRepository.save(existingCircle);

        CircleResponse circleResponse = circleResponse(updatedCircle);
        return circleResponse;
    }

    public void deleteCircle(Long id) {
        if (!circleRepository.existsById(id)) {
            throw new NoSuchElementException("Unable to find and delete Circle with this id");
        }
        circleRepository.deleteById(id);
    }



  



    
}
