package com.spring2020.coffeeshop.service.impl;


public interface CancelReasonService {

    String findCancelReasonByOrderId(long orderId);
}
