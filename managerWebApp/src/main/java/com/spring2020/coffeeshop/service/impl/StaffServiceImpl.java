package com.spring2020.coffeeshop.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.coffeeshop.domain.dto.StaffDto;
import com.spring2020.coffeeshop.domain.entity.AppRole;
import com.spring2020.coffeeshop.domain.entity.Staff;
import com.spring2020.coffeeshop.domain.enums.UserType;
import com.spring2020.coffeeshop.exception.MissingInputException;
import com.spring2020.coffeeshop.exception.ResourceNotFoundException;
import com.spring2020.coffeeshop.repository.StaffRepository;
import com.spring2020.coffeeshop.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public StaffDto createStaff(StaffDto staffDto) {
        if (staffDto == null) {
            throw new MissingInputException("missing input");
        }
        Staff staff = mapper.convertValue(staffDto, Staff.class);
        staff.getAppUser().setActive(true);
        staff.getAppUser().setUserType(UserType.STAFF);
        staff.setHireDate(LocalDate.now());
        AppRole role = new AppRole(1, "ROLE_STAFF");
        staff.getAppUser().setAppRole(role);
        Staff savedStaff = staffRepository.save(staff);
        return mapper.convertValue(savedStaff, StaffDto.class);
    }

    @Override
    public void updateStaffStatus(Long id, boolean status) {
        Staff staff = findStaffByIdReturnStaff(id);
        if (!status) {
            staff.setTerminateDate(LocalDate.now());
        } else {
            staff.setTerminateDate(null);
        }
        staffRepository.save(staff);
    }

    private Staff findStaffByIdReturnStaff(long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff with id " + id + " not found"));
    }
}
