package com.spring2020.coffeeshop.repository;

import com.spring2020.coffeeshop.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByAppUserId(long appUserId);

    @Query(
            value = "select s.* from staff s\n" +
                    "join app_user au \n" +
                    "on s.app_user_id = au.id and au.username = :username",
            nativeQuery = true
    )
    Optional<Staff> findByUserName(@Param("username") String username);

}
