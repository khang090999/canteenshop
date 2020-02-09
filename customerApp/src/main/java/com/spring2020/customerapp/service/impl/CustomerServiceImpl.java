package com.spring2020.customerapp.service.impl;

import com.spring2020.customerapp.domain.dto.AppUserDto;
import com.spring2020.customerapp.domain.dto.CustomerDto;
import com.spring2020.customerapp.domain.entity.Customer;
import com.spring2020.customerapp.exception.MissingInputException;
import com.spring2020.customerapp.mapper.CustomerMapper;
import com.spring2020.customerapp.repository.CustomerRepository;
import com.spring2020.customerapp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void updateCustomer(int id, AppUserDto appUserDto) {
        Customer customer = customerRepository.getOne(id);
        CustomerDto dto = CustomerMapper.INSTANCE.toDto(customer);
        dto.setAppUser(appUserDto);
        customer = CustomerMapper.INSTANCE.toEntity(dto);
        customerRepository.save(customer);
    }

    @Override
    public CustomerDto createCustomer(AppUserDto appUserDto) {
        if (appUserDto == null) {
            throw new MissingInputException("missing input");
        }
        CustomerDto dto = new CustomerDto();
        dto.setAppUser(appUserDto);
        Customer customer = CustomerMapper.INSTANCE.toEntity(dto);
        CustomerDto saved = CustomerMapper.INSTANCE.toDto(customerRepository.saveAndFlush(customer));

        return saved;
    }
}
