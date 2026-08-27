package com.ajo.circle;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.ajo.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name = "circles");
public class Circle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String name;
    private BigDecimal contributionAmount;
    private Frequency frequency;
    private Integer maxMembers; 
    private LocalDate startDate;
    private String inviteCode;
    private Integer currentCycle;
    @ManyToOne 
    @JoinColumn(name = "organiser_id")
    private User organiser;



    
}
