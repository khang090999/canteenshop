package com.spring2020.coffeeshop.service;

import com.spring2020.coffeeshop.domain.dto.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto);

    void updateProductData(long id, ProductDto productDto);

    void updateProductImage(long id, String urlImg);

    ProductDto findProductById(long id);

    Page<ProductDto> findAllProduct(Pageable pageable);

    Page<ProductDto> findProductByNameOrCategory(String name, Integer categoryId, Pageable pageable);

}
