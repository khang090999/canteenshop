package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
