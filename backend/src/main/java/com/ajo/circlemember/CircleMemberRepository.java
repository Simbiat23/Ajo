package com.ajo.circlemember;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository 
public interface CircleMemberRepository extends JpaRepository<CircleMember, Long>  {

    List<CircleMember> findByCircleId(Long circleId);
    List<CircleMember> findByUserId(Long userId);




    

    
}
