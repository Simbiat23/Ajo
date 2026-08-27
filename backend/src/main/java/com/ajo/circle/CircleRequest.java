package com.ajo.circle;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class CircleRequest {
    private String name;
    private BigDecimal contributionAmount;
    private Frequency frequency;
    private Integer maxMembers; 
    private LocalDate startDate;
    

    
}
