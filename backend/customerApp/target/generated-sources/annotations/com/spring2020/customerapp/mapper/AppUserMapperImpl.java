package com.spring2020.customerapp.mapper;

import com.spring2020.customerapp.domain.dto.UserInfoDto;
import com.spring2020.customerapp.domain.entity.AppUser;
import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-03-15T13:00:11+0700",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 11.0.5 (JetBrains s.r.o)"
)
public class AppUserMapperImpl implements AppUserMapper {

    @Override
    public UserInfoDto toDto(AppUser entity) {
        if ( entity == null ) {
            return null;
        }

        UserInfoDto userInfoDto = new UserInfoDto();

        userInfoDto.setFirstName( entity.getFirstName() );
        userInfoDto.setLastName( entity.getLastName() );
        userInfoDto.setPhone( entity.getPhone() );
        userInfoDto.setEmail( entity.getEmail() );
        userInfoDto.setGender( entity.getGender() );

        return userInfoDto;
    }
}
