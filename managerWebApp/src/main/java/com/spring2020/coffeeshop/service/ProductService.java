package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.ProductDto;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto);

    void updateProduct(long id, ProductDto productDto);

    ProductDto findProductDataById(long id);

    Resource findProductImageById(long id);

    Page<ProductDto> findAllProduct(Pageable pageable);

    Page<ProductDto> findProductByName(String name, Pageable pageable);

    Page<ProductDto> findProductByCategory(String category, Pageable pageable);

}
