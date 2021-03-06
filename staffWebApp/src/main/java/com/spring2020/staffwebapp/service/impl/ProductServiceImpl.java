package com.spring2020.staffwebapp.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.staffwebapp.domain.dto.ProductDto;
import com.spring2020.staffwebapp.repository.ProductRepository;
import com.spring2020.staffwebapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService
{
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public Page<ProductDto> findAllProducts(Pageable pageable)
    {
        return productRepository.findAll(pageable)
                .map(product -> objectMapper.convertValue(product, ProductDto.class));
    }


    @Override
    public Page<ProductDto> findProducts(Pageable pageable, String name, Integer categoryId, Boolean isAvailable)
    {
        if (name != null)
        {
            name = "%" + name + "%";
        } else
        {
            name = "";
        }

        String categoryIdString = "";
        if (categoryId != null)
        {
            categoryIdString = String.valueOf(categoryId);
        }

        return productRepository.findProducts(name, categoryIdString, isAvailable, pageable)
                .map(product -> objectMapper.convertValue(product, ProductDto.class));
    }

    @Override
    public Optional<ProductDto> showProductDetails(Long id)
    {
        return productRepository.findById(id)
                .map(product -> objectMapper.convertValue(product, ProductDto.class));
    }
}
