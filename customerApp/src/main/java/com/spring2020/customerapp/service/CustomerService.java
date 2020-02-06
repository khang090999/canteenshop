package com.spring2020.customerapp.service;

import com.spring2020.customerapp.domain.dto.AppUserDto;
import com.spring2020.customerapp.domain.dto.CustomerDto;

public interface CustomerService {
    void updateCustomer(int id, AppUserDto appUserDto);

    CustomerDto createCustomer(AppUserDto appUserDto);

}
