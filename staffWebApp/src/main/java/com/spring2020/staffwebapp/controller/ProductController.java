package com.spring2020.staffwebapp.controller;

import com.spring2020.staffwebapp.domain.dto.DbResponseDto;
import com.spring2020.staffwebapp.domain.dto.ProductDto;
import com.spring2020.staffwebapp.service.ProductEditService;
import com.spring2020.staffwebapp.service.ProductRetrieveService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController
{

    @Autowired
    private ProductRetrieveService productRetrieveService;
    @Autowired
    private ProductEditService productEditService;

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

    @GetMapping("/search")
    @ApiOperation(value = "Will search based on what is entered")
    public Page<ProductDto> searchProducts(@RequestParam(value = "Product name", required = false) String name,
                                           @RequestParam(value = "Category", required = false) Integer categoryId,
                                           @RequestParam(value = "Availability") @ApiParam(example = "true", required = true, value = "Status") Boolean isAvailable,
                                           Pageable pageable)
    {
        return productRetrieveService.findProducts(pageable, name, categoryId, isAvailable);
    }

    @PostMapping
    @ApiOperation(value = "Update product availability")
    public DbResponseDto editProductAvailability(@RequestParam(value = "Product id") long id, @RequestParam(value = "isAvailable") boolean isAvailable)
    {
        return productEditService.editProductAvailability(id, isAvailable);
    }

}