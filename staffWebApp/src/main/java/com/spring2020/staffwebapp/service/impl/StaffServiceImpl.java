package com.spring2020.staffwebapp.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.staffwebapp.domain.dto.StaffProfileDto;
import com.spring2020.staffwebapp.domain.dto.StaffUpdateDto;
import com.spring2020.staffwebapp.domain.entity.AppUser;
import com.spring2020.staffwebapp.domain.entity.Staff;
import com.spring2020.staffwebapp.domain.request.UpdateStaffProfileRequest;
import com.spring2020.staffwebapp.repository.AppUserRepository;
import com.spring2020.staffwebapp.repository.StaffRepository;
import com.spring2020.staffwebapp.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService
{
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ObjectMapper objectMapper;

    @Override
    public StaffProfileDto viewStaffProfile(String username)
    {
        StaffProfileDto staffProfileDto = new StaffProfileDto();
        Optional<AppUser> appUser = appUserRepository.findAppUserByUsername(username);
        if (appUser.isPresent())
        {
            Optional<Staff> staff = staffRepository.findStaffByAppUserId(appUser.get().getId());
            if (staff.isPresent())
            {
                staffProfileDto.setAddress(staff.get().getAddress());
                staffProfileDto.setDob(staff.get().getDob());
                staffProfileDto.setHireDate(staff.get().getHireDate());
                staffProfileDto.setSocialId(staff.get().getSocialId());
            }
            staffProfileDto.setEmail(appUser.get().getEmail());
            staffProfileDto.setFirstName(appUser.get().getFirstName());
            staffProfileDto.setLastName(appUser.get().getLastName());
            staffProfileDto.setPhone(appUser.get().getPhone());
            staffProfileDto.setGender(appUser.get().getGender());
        }

        return staffProfileDto;
    }

    @Override
    public StaffUpdateDto updateStaff(UpdateStaffProfileRequest request)
    {
//        String username = request.getUsername();
//        Optional<AppUser> appUser = appUserRepository.findAppUserByUsername(username);
//        if (appUser.isPresent())
//        {
//            appUser.get().setPhone(request.getPhone());
//            Optional<Staff> staff = staffRepository.findStaffByAppUserId(appUser.get().getId());
//            if (staff.isPresent())
//            {
//
//            }
//        }
        return null;
    }
}
