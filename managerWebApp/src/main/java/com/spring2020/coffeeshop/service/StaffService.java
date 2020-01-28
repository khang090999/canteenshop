package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.StaffDto;

public interface StaffService {

    StaffDto createStaff(StaffDto staffDto);

    void updateStaffStatus(Long id, boolean status);

}
