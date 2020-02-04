package com.spring2020.coffeeshop.service.impl;

import com.spring2020.coffeeshop.exception.ResourceNotFoundException;
import com.spring2020.coffeeshop.repository.CancelReasonRepository;
import com.spring2020.coffeeshop.service.CancelReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CancelReasonServiceImpl implements CancelReasonService {

    @Autowired
    private CancelReasonRepository reasonRepository;

    @Override
    public String findCancelReasonByOrderId(long orderId) {
        return reasonRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with id " + orderId + " not found"))
                .getReason();
    }
}
