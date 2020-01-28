package com.spring2020.coffeeshop.domain.dto;

import com.spring2020.coffeeshop.domain.entity.AppUser;

import java.time.LocalDate;

public class StaffDto {


    private Long id;

    private LocalDate dob;

    private String address;

    private String socialId;

    private LocalDate hireDate;

    private LocalDate terminateDate;

    private AppUser appUser;
}
