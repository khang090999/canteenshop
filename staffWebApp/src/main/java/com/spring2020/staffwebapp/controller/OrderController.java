package com.spring2020.staffwebapp.controller;

import com.spring2020.staffwebapp.domain.dto.OrderDetailsDto;
import com.spring2020.staffwebapp.service.OrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController
{
    @Autowired
    OrderInfoService orderInfoService;

    @GetMapping("/details")
    public OrderDetailsDto viewOrderDetails(@RequestParam(value = "Order id") long id)
    {
        return orderInfoService.viewOrderDetails(id);
    }

    @GetMapping("/find")
    public Page<OrderDetailsDto> findOrdersByStaff(@RequestParam(value = "Staff username") String username
            , Pageable pageable)
    {
        return orderInfoService.findOrderByStaff(username, pageable);
    }
}
