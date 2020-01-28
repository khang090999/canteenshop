package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long>
{
    Optional<Staff> findStaffByAppUserId(Long id);
}
