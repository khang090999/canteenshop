package com.spring2020.customerapp.mapper;

import com.spring2020.customerapp.domain.dto.OrderDetailDto;
import com.spring2020.customerapp.domain.dto.OrderDto;
import com.spring2020.customerapp.domain.entity.CustomerOrder;
import com.spring2020.customerapp.domain.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper( OrderMapper.class );

    OrderDetailDto toDto(OrderDetail order);

    OrderDetail toEntity(OrderDetailDto order);

    CustomerOrder toEntity(OrderDto order);

    OrderDto toDto(CustomerOrder order);

}
