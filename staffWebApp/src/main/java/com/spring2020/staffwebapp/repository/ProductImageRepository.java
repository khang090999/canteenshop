package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
