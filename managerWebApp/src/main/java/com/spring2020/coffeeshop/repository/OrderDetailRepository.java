package com.spring2020.coffeeshop.repository;

import com.spring2020.coffeeshop.domain.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
