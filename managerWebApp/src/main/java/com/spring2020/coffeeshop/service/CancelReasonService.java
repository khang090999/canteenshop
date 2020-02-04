package com.spring2020.coffeeshop.service;


public interface CancelReasonService {

    String findCancelReasonByOrderId(long orderId);
}
