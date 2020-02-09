package com.spring2020.customerapp.domain.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NewOrderDetailDto {

    private int quantity;

    private ProductDto product;

}
