package com.ajo.circle;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/ajo/circle")

public class CircleController {

    private final CircleService circleService;

    public CircleController (CircleService circleService) {
        this.circleService = circleService;
    
    }
    

    @PostMapping("/createcircle")
    public CircleResponse createCircle(@RequestBody CircleRequest request) {
        return circleService.createCircle(request);
    }

    @GetMapping
    public List<CircleResponse> getAllCircle() {
        return circleService.getAllCircles();
    }

    @GetMapping("/{id}")
    public CircleResponse getCircleById(@PathVariable Long id) {
        return circleService.getCircleById(id);
    }

    @PutMapping("/{id}")
    public CircleResponse updateCircle(@PathVariable Long id, @RequestBody CircleRequest request ) {
        return circleService.updateCircle(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCircle(@PathVariable Long id) {
        circleService.deleteCircle(id);
    }
}
