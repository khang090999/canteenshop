package com.spring2020.coffeeshop.controller;

import com.spring2020.coffeeshop.domain.dto.ProductDto;
import com.spring2020.coffeeshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.spring2020.coffeeshop.util.ConstantUtil.UPDATE_SUCCESS;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductDto createProduct(@Valid @RequestBody ProductDto productDto) {
        return productService.createProduct(productDto);
    }

    @PutMapping("/{id}")
    public String updateProduct(@PathVariable(value = "id") long id,
                                @Valid @RequestBody ProductDto productDto) {
        productService.updateProduct(id, productDto);
        return UPDATE_SUCCESS;
    }

    @GetMapping("/{id}")
    public ProductDto findProductById(@PathVariable(value = "id") long id) {
        return productService.findProductById(id);
    }

    @GetMapping
    public Page<ProductDto> findProduct(@RequestParam(required = false, value = "name") String name,
                                        @RequestParam(required = false, value = "category") String category,
                                        Pageable pageable) {
        if (name != null) {
            return productService.findProductByName(name, pageable);
        }
        if (category != null) {
            return productService.findProductByCategory(category, pageable);
        }
        return productService.findAllProduct(pageable);
    }
}
