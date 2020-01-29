package com.spring2020.staffwebapp.controller;

import com.spring2020.staffwebapp.domain.dto.DbResponseDto;
import com.spring2020.staffwebapp.domain.dto.StaffProfileDto;
import com.spring2020.staffwebapp.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staff")
public class StaffController
{
    @Autowired
    private StaffService staffService;

    @GetMapping("/profile")
    public StaffProfileDto viewStaffProfile(@RequestParam(value = "Username") String username)
    {
        return staffService.viewStaffProfile(username);
    }

    @PostMapping("/profile")
    public DbResponseDto updateStaffProfile(@RequestBody StaffProfileDto request)
    {
        return staffService.updateStaff(request);
    }
}
