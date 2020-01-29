package com.spring2020.staffwebapp.controller;

import com.spring2020.staffwebapp.domain.dto.ProductDto;
import com.spring2020.staffwebapp.service.ProductRetrieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController
{

    @Autowired
    private ProductRetrieveService productRetrieveService;

    @GetMapping
    public Page<ProductDto> showAllAvailableProducts(Pageable pageable)
    {
        return productRetrieveService.findAllProducts(pageable);
    }

    @GetMapping("/details")
    public Optional<ProductDto> showProductDetails(@RequestParam(value = "Product Id") Long id)
    {
        return productRetrieveService.showProductDetails(id);
    }

    @GetMapping("/find")
    public Page<ProductDto> findProducts(@RequestParam(value = "Product name", required = false) String name,
                                         @RequestParam(value = "Category", required = false) Integer catetoryId,
                                         @RequestParam(value = "Availability") Boolean isAvailable,
                                         Pageable pageable)
    {
        return productRetrieveService.findProducts(pageable, name, catetoryId, isAvailable);
    }

}