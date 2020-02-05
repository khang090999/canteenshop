package com.spring2020.coffeeshop.controller;

import com.spring2020.coffeeshop.domain.dto.OrderDto;
import com.spring2020.coffeeshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static com.spring2020.coffeeshop.util.ConstantUtil.DATE_TIME_PATTERN;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public Page<OrderDto> findOrderInPeriod(@DateTimeFormat(pattern = DATE_TIME_PATTERN)
                                            @RequestParam(value = "startDate") LocalDateTime startDate,
                                            @DateTimeFormat(pattern = DATE_TIME_PATTERN)
                                            @RequestParam(value = "endDate") LocalDateTime endDate,
                                            Pageable pageable) {
        return orderService.findOrderInPeriod(startDate, endDate, pageable);
    }
}
