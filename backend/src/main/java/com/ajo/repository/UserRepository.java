package com.ajo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ajo.entity.User;
//Repository layer to perform CRUD operation 
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmail(String email); 
 
} 
    

