package com.spring2020.staffwebapp.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdateStaffProfileRequest
{
    private String username;
    private String address;
    private String phone;
    private String email;
}
