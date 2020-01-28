package com.spring2020.coffeeshop.repository;

import com.spring2020.coffeeshop.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByAppUserId(long appUserId);

}
