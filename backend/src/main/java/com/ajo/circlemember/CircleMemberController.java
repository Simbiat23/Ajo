package com.ajo.circlemember;

import com.ajo.circle.CircleResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:8081"})
@RestController
@RequestMapping("/ajo/circlemember")
public class CircleMemberController {
    private final CircleMemberService circleMemberService;

    public CircleMemberController(CircleMemberService circleMemberService) {
        this.circleMemberService = circleMemberService;
    }

    @PostMapping("/join")
    public CircleResponse joinCircle(@RequestBody JoinCircleRequest request) {
        System.out.println("Raw request object: " + request);
        System.out.println("Received inviteCode: " + request.getInviteCode());
        System.out.println("Received userId: " + request.getUserId());
        return circleMemberService.joinCircle(request);
    }
    
}
