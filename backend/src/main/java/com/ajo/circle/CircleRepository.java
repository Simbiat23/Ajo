package com.ajo.circle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CircleRepository extends JpaRepository<Circle, Long> {

    Optional<Circle> findByInviteCode(String inviteCode);


    
}
