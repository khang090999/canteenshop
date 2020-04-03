package com.spring2020.coffeeshop.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDto {

    @Length(min = 1, max = 500, message = "{productImage.imgUrl.length}")
    @NotNull
    private String imgUrl;

}
