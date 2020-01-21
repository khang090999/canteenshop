package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
