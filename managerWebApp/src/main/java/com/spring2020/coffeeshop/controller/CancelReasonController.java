package com.spring2020.coffeeshop.controller;

import com.spring2020.coffeeshop.domain.dto.CancelReasonDto;
import com.spring2020.coffeeshop.service.CancelReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cancelReasons")
@CrossOrigin(origins = "http://localhost:3000")
public class CancelReasonController {

    @Autowired
    private CancelReasonService cancelReasonService;

    @GetMapping
    public CancelReasonDto findCancelReasonByOrderId(@RequestParam(value = "orderId") long orderId) {
        return cancelReasonService.findCancelReasonByOrderId(orderId);
    }


}
