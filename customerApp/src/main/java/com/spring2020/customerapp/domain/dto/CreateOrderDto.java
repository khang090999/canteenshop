package com.spring2020.customerapp.domain.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateOrderDto {

    private Long id;

    private String location;

    private String note;

    private double totalPrice;

    private List<NewOrderDetailDto> orderDetails;

    private int customerId;

}
