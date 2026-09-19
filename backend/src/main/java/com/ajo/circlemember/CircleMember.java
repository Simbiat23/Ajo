package com.ajo.circlemember;

import com.ajo.circle.Circle;
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
@Table(name= "circle_member")
public class CircleMember {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "circle_id")
    private Circle circle; //  links this membership row to one specific circle, via the circle_id foreign key where many CircleMember rows can point to the same circle
    @ManyToOne
    @JoinColumn(name = "user_id") // links this membership row to one specific user, via the user_id foreign key where many CircleMember rows can point to the same user
    private User user;
    
}
