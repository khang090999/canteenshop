package com.spring2020.staffwebapp.domain.dto;

import com.spring2020.staffwebapp.domain.enums.GenderEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class StaffUpdateDto
{
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private GenderEnum gender;
    private LocalDate dob;
    private String address;
    private String socialId;
    private LocalDate hireDate;
    boolean isUpdate;
}
