package com.spring2020.staffwebapp.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.staffwebapp.domain.dto.OrderDetailsDto;
import com.spring2020.staffwebapp.domain.entity.AppUser;
import com.spring2020.staffwebapp.domain.entity.CustomerOrder;
import com.spring2020.staffwebapp.domain.entity.Staff;
import com.spring2020.staffwebapp.repository.AppUserRepository;
import com.spring2020.staffwebapp.repository.CustomerOrderRepository;
import com.spring2020.staffwebapp.repository.StaffRepository;
import com.spring2020.staffwebapp.service.OrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderInfoServiceImpl implements OrderInfoService
{
    @Autowired
    CustomerOrderRepository customerOrderRepository;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public OrderDetailsDto viewOrderDetails(Long id)
    {
        OrderDetailsDto orderDetailsDto = new OrderDetailsDto();
        Optional<CustomerOrder> customerOrderOptional = customerOrderRepository.findById(id);
        if (customerOrderOptional.isPresent())
        {
            Optional<OrderDetailsDto> orderDetailsDtoOptional = customerOrderOptional
                    .map(orderDetail -> objectMapper.convertValue(orderDetail, OrderDetailsDto.class));
            if (orderDetailsDtoOptional.isPresent())
            {
                orderDetailsDto = orderDetailsDtoOptional.get();
            }
        }
        return orderDetailsDto;
    }

    @Override
    public Page<OrderDetailsDto> findOrderByStaff(String username, Pageable pageable)
    {
        Optional<AppUser> appUserOptional = appUserRepository.findAppUserByUsername(username);
        if (appUserOptional.isPresent())
        {
            Optional<Staff> staffOptional = staffRepository.findStaffByAppUserId(appUserOptional.get().getId());
            if (staffOptional.isPresent())
            {
                Long staffId = staffOptional.get().getId();
                return customerOrderRepository.findAllByStaffId(staffId, pageable)
                        .map(customerOrder -> objectMapper.convertValue(customerOrder, OrderDetailsDto.class));
            }
        }
        return null;
    }
}
