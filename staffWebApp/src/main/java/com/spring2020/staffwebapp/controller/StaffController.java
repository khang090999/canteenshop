package com.spring2020.staffwebapp.controller;

import com.spring2020.staffwebapp.domain.dto.StaffProfileDto;
import com.spring2020.staffwebapp.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/staff")
public class StaffController
{
    @Autowired
    private StaffService staffService;

    @GetMapping
    public StaffProfileDto showAllAvailableProducts(@RequestParam(value = "Username") String username)
    {
        return staffService.viewStaffProfile(username);
    }
}
