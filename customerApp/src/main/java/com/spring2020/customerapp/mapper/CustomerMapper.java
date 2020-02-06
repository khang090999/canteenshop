package com.spring2020.customerapp.mapper;

import com.spring2020.customerapp.domain.dto.CustomerDto;
import com.spring2020.customerapp.domain.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper( CustomerMapper.class );

    CustomerDto toDto(Customer product);

    Customer toEntity(CustomerDto product);

}
