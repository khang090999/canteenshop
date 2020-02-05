package com.spring2020.staffwebapp.domain.enums;

public enum InputValidateMessageEnum
{
    ORDER_STATUS_NOT_FOUND("Order status is not found in database"),
    ORDER_NOT_FOUND("Order is not found in database"),
    PRODUCT_NOT_FOUND("Product is not found in database");

    private String message;

    InputValidateMessageEnum(String message)
    {
        this.message = message;
    }

    public String getMessage()
    {
        return message;
    }
}
