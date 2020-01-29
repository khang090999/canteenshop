package com.spring2020.staffwebapp.domain.dto;

import com.spring2020.staffwebapp.domain.entity.Category;
import com.spring2020.staffwebapp.domain.entity.ProductImage;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@NoArgsConstructor
public class ProductDto
{
    @NotNull
    @ApiModelProperty(required = true)
    private Long id;
    private String name;
    private double price;
    private String description;
    private Category category;
    private boolean isAvailable;
    private ProductImage productImage;
}
