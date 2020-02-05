package com.spring2020.coffeeshop.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.coffeeshop.domain.dto.StaffDto;
import com.spring2020.coffeeshop.domain.entity.AppRole;
import com.spring2020.coffeeshop.domain.entity.Staff;
import com.spring2020.coffeeshop.domain.enums.UserType;
import com.spring2020.coffeeshop.exception.MissingInputException;
import com.spring2020.coffeeshop.repository.StaffRepository;
import com.spring2020.coffeeshop.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public void createStaff(StaffDto staffDto) {
        if (staffDto == null) {
            throw new MissingInputException("missing input");
        }
        Staff staff = mapper.convertValue(staffDto, Staff.class);
        staff.getAppUser().setActive(true);
        staff.getAppUser().setUserType(UserType.STAFF);
        staff.setHireDate(LocalDate.now());
        AppRole role = new AppRole(1, "ROLE_STAFF");
        staff.getAppUser().setAppRole(role);
        staff.getAppUser().setPassword(encoder.encode(staff.getAppUser().getPassword()));
        staffRepository.save(staff);
    }


}
