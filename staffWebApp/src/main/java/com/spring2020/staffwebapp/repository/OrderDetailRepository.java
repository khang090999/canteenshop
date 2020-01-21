package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
