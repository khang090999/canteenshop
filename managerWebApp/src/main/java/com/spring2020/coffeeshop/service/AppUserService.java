package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.AppUserDto;
import com.spring2020.coffeeshop.domain.enums.UserType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppUserService {

    AppUserDto findAppUserById(long id);

    Page<AppUserDto> findAppUserByName(String name, UserType userType, Pageable pageable);

    Page<AppUserDto> findAllAppUsers(UserType userType, Pageable pageable);

    void updateAppUserStatus(UserType userType, long id, boolean status);
}
