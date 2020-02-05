package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.StaffCreateDto;
import com.spring2020.coffeeshop.domain.dto.StaffDetailDto;

public interface StaffService {

    void createStaff(StaffCreateDto staffDto);

    StaffDetailDto findStaffByUsername(String username);

}
