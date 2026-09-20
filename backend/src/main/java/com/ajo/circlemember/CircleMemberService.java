package com.ajo.circlemember;

import com.ajo.user.User;
import org.springframework.stereotype.Service;
import com.ajo.circle.Circle;
import com.ajo.circle.CircleRepository;
import com.ajo.circle.CircleResponse;
import com.ajo.exception.InvalidInviteCodeException;
import com.ajo.user.UserRepository;


@Service 
public class CircleMemberService {
    
    private final CircleRepository circleRepository;
    private final UserRepository userRepository;
    private final CircleMemberRepository circleMemberRepository;

    public CircleMemberService (CircleRepository circleRepository, UserRepository userRepository, CircleMemberRepository circleMemberRepository) {
        this.circleRepository = circleRepository;
        this.userRepository = userRepository;
        this.circleMemberRepository = circleMemberRepository;
    }

    public CircleResponse joinCircle(JoinCircleRequest request) {

       Circle findByInviteCode = circleRepository.findByInviteCode(request.getInviteCode()).orElseThrow( () -> new InvalidInviteCodeException("Invite Does not exist"));

       User findByUserId = userRepository.findById(request.getUserId()).orElseThrow();
       
       CircleMember newMemberOfCircle = new CircleMember();
       newMemberOfCircle.setCircle(findByInviteCode);
       newMemberOfCircle.setUser(findByUserId);
       circleMemberRepository.save(newMemberOfCircle);

       CircleResponse circleResponse = new CircleResponse(findByInviteCode.getId(), findByInviteCode.getName(), findByInviteCode.getContributionAmount(), findByInviteCode.getFrequency(), findByInviteCode.getMaxMembers(), findByInviteCode.getStartDate(), findByInviteCode.getInviteCode(), findByInviteCode.getCurrentCycle());

       return circleResponse;
     
    }

  



    
}
