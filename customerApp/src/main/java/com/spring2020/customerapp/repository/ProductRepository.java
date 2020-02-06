package com.spring2020.customerapp.repository;

import com.spring2020.customerapp.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByNameContainingAndAvailable(String name, boolean isAvailable, Pageable pageable);

    Page<Product> findAllByAvailable(boolean isAvailable, Pageable pageable);

}
