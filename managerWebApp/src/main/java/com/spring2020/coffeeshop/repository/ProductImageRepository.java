package com.spring2020.coffeeshop.repository;

import com.spring2020.coffeeshop.domain.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
