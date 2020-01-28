package com.spring2020.staffwebapp.domain.dto;

import com.spring2020.staffwebapp.domain.entity.Category;
import com.spring2020.staffwebapp.domain.entity.ProductImage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ProductDto
{
    private Long id;
    private String name;
    private double price;
    private String description;
    private Category category;
    private boolean isAvailable;
    private ProductImage productImage;

}
