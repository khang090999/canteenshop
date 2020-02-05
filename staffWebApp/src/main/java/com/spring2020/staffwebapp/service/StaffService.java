package com.spring2020.staffwebapp.service;

import com.spring2020.staffwebapp.domain.dto.DbResponseDto;
import com.spring2020.staffwebapp.domain.dto.StaffProfileDto;

public interface StaffService
{

    StaffProfileDto viewStaffProfile(String username);

    DbResponseDto updateStaff(StaffProfileDto request);
}