package com.spring2020.staffwebapp.service;

import com.spring2020.staffwebapp.domain.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProductService
{
    Page<ProductDto> findAllProducts(Pageable pageable);

    Page<ProductDto> findProducts(Pageable pageable, String name, Integer categoryId, Boolean isAvailable);

    Optional<ProductDto> showProductDetails(Long id);
}
