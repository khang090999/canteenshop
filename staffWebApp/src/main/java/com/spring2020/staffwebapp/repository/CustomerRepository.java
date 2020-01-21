package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
