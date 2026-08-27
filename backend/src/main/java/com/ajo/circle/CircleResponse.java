package com.ajo.circle;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class CircleResponse {
    private Long id;
    private String name;
    private BigDecimal contributionAmount;
    private Frequency frequency;
    private Integer maxMembers; 
    private LocalDate startDate;
    private String inviteCode;
    private Integer currentCycle;

    
    
}


