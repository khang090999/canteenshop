package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
