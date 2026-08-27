package com.ajo.circle;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ajo/circle")

public class CircleController {

    private final CircleService circleService;

    public CircleController (CircleService circleService) {
        this.circleService = circleService;
    
    }
    

    @PostMapping("/createcircle")
    public CircleResponse createCircle(@RequestBody CircleRequest circleRequest) {
        return circleService.createCircle(circleRequest);
    }
}
