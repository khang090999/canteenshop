package com.spring2020.coffeeshop.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring2020.coffeeshop.domain.dto.ProductDto;
import com.spring2020.coffeeshop.domain.entity.Product;
import com.spring2020.coffeeshop.exception.MissingInputException;
import com.spring2020.coffeeshop.exception.ResourceNotFoundException;
import com.spring2020.coffeeshop.repository.ProductRepository;
import com.spring2020.coffeeshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        if (productDto == null) {
            throw new MissingInputException("missing input");
        }
        Product product = mapper.convertValue(productDto, Product.class);
        product.setAvailable(true);
        Product savedProduct = productRepository.save(product);
        return mapper.convertValue(savedProduct, ProductDto.class);
    }

    @Override
    public void updateProduct(long id, ProductDto productDto) {
        if (productDto == null) {
            throw new MissingInputException("missing input");
        }
        Product updatingProduct = findProductByIdReturnProduct(id);
        Product inputProduct = mapper.convertValue(productDto, Product.class);
        updatingProduct.setName(inputProduct.getName());
        updatingProduct.setPrice(inputProduct.getPrice());
        updatingProduct.setDescription(inputProduct.getDescription());
        updatingProduct.setCategory(inputProduct.getCategory());
        updatingProduct.setAvailable(inputProduct.isAvailable());
        productRepository.save(updatingProduct);
    }

    @Override
    public ProductDto findProductById(long id) {
        return mapper.convertValue(findProductByIdReturnProduct(id), ProductDto.class);
    }

    @Override
    public Page<ProductDto> findAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(product -> mapper.convertValue(product, ProductDto.class));
    }

    @Override
    public Page<ProductDto> findProductByName(String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable)
                .map(product -> mapper.convertValue(product, ProductDto.class));
    }

    @Override
    public Page<ProductDto> findProductByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable)
                .map(product -> mapper.convertValue(product, ProductDto.class));
    }

    private Product findProductByIdReturnProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " not found"));
    }
}
