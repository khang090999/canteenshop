package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
}
