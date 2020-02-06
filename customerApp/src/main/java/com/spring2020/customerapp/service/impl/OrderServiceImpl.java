package com.spring2020.customerapp.service.impl;

import com.spring2020.customerapp.domain.dto.OrderDetailDto;
import com.spring2020.customerapp.domain.dto.OrderDto;
import com.spring2020.customerapp.domain.entity.CustomerOrder;
import com.spring2020.customerapp.domain.entity.OrderStatus;
import com.spring2020.customerapp.domain.enums.OrderStatusEnum;
import com.spring2020.customerapp.exception.MissingInputException;
import com.spring2020.customerapp.repository.CustomerOrderRepository;
import com.spring2020.customerapp.repository.OrderDetailRepository;
import com.spring2020.customerapp.repository.OrderStatusRepository;
import com.spring2020.customerapp.service.OrderService;
import com.spring2020.customerapp.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {

        if (orderDto == null) {
            throw new MissingInputException("missing input");
        }
        CustomerOrder customerOrder = OrderMapper.INSTANCE.toEntity(orderDto);
        customerOrder.getStatus().setStatus(OrderStatusEnum.Pending);

        OrderDto savedOrder = OrderMapper.INSTANCE.toDto(customerOrderRepository.saveAndFlush(customerOrder));
        return savedOrder;

    }

    @Override
    public void cancelOrder(int id) {
        OrderStatus orderStatus = orderStatusRepository.getOne(id);
        if(orderStatus.getStatus().equals(OrderStatusEnum.Pending)) {
            orderStatus.setStatus(OrderStatusEnum.Canceled);
            orderStatusRepository.saveAndFlush(orderStatus);
        }
    }

    @Override
    public OrderDetailDto viewOrderDetail(Long id) {
//        Optional<OrderDetail> detailOptional = orderDetailRepository.findById(id);
//        if (detailOptional.isPresent()) {
//            return OrderMapper.INSTANCE.toDto(detailOptional.get());
//        }
//        else {
//            return new OrderDetailDto();
//        }

        return OrderMapper.INSTANCE.toDto(orderDetailRepository.getOne(id));
    }

    @Override
    public Page<OrderDto> viewOrderHistory(Pageable pageable, int customerId) {
        return customerOrderRepository.findCustomerOrdersByCustomer(customerId, pageable)
                .map(order -> OrderMapper.INSTANCE.toDto(order));
    }


}
