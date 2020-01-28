package com.spring2020.staffwebapp.service;

import com.spring2020.staffwebapp.domain.dto.StaffProfileDto;
import com.spring2020.staffwebapp.domain.dto.StaffUpdateDto;
import com.spring2020.staffwebapp.domain.request.UpdateStaffProfileRequest;

public interface StaffService
{

    StaffProfileDto viewStaffProfile(String username);

    StaffUpdateDto updateStaff(UpdateStaffProfileRequest request);
}
