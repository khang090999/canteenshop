package com.spring2020.coffeeshop.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.coffeeshop.domain.dto.OrderDto;
import com.spring2020.coffeeshop.repository.CustomerOrderRepository;
import com.spring2020.coffeeshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static com.spring2020.coffeeshop.util.ConstantUtil.DATE_TIME_PATTERN;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CustomerOrderRepository orderRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public Page<OrderDto> findOrderInPeriod(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_TIME_PATTERN);
        return orderRepository.findOrderInPeriod(formatter.format(startDate), formatter.format(endDate), pageable)
                .map(customerOrder -> mapper.convertValue(customerOrder, OrderDto.class));
    }
}
