package com.ajo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.ajo.entity.Circle;
@Repository
public interface CircleRepository extends JpaRepository<Circle, Long> {

    Optional<Circle> findByInviteCode(String inviteCode);


    
}
