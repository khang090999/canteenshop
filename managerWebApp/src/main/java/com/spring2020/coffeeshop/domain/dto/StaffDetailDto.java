package com.spring2020.coffeeshop.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaffDetailDto {

    private Long id;

    private LocalDate dob;

    private String address;

    private String socialId;

    private LocalDate hireDate;

    private LocalDate terminateDate;

    private AppUserDto appUser;
}
