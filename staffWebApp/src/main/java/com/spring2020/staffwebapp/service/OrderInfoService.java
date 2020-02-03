package com.spring2020.staffwebapp.service;

import com.spring2020.staffwebapp.domain.dto.OrderDetailsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderInfoService
{
    OrderDetailsDto viewOrderDetails(Long id);

    Page<OrderDetailsDto> findOrderByStaff(String username, Pageable pageable);
}
