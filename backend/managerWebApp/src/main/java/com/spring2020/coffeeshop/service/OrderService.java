package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface OrderService {

    Page<OrderDto> findOrderInPeriod(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
