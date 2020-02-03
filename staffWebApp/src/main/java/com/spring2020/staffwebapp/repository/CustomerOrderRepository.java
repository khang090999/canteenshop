package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long>
{
    Page<CustomerOrder> findAllByStaffId(Long id, Pageable pageable);
}
