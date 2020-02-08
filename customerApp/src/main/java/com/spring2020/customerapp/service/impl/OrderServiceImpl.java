package com.spring2020.customerapp.service.impl;

import com.spring2020.customerapp.domain.dto.CreateOrderDto;
import com.spring2020.customerapp.domain.dto.NewOrderDetailDto;
import com.spring2020.customerapp.domain.dto.OrderDetailDto;
import com.spring2020.customerapp.domain.dto.OrderDto;
import com.spring2020.customerapp.domain.entity.CustomerOrder;
import com.spring2020.customerapp.domain.entity.OrderDetail;
import com.spring2020.customerapp.domain.entity.OrderStatus;
import com.spring2020.customerapp.domain.enums.OrderStatusEnum;
import com.spring2020.customerapp.exception.CommonException;
import com.spring2020.customerapp.exception.MissingInputException;
import com.spring2020.customerapp.exception.ResourceNotFoundException;
import com.spring2020.customerapp.repository.*;
import com.spring2020.customerapp.service.OrderService;
import com.spring2020.customerapp.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public OrderDto createOrder(CreateOrderDto orderDto) {
        try {
            if (orderDto == null) {
                throw new MissingInputException("missing input");
            }
            if(!customerRepository.findById(orderDto.getCustomerId()).isPresent()) {
                throw new CommonException("CustomerId not Available");
            }
            if (orderDto.getId() != null) {
                throw new CommonException("OrderDetail's Id must be empty");
            }
            List<NewOrderDetailDto> listDetail = orderDto.getOrderDetails();
            for (NewOrderDetailDto newOrderDetailDto : listDetail) {
                if (!productRepository.findById(newOrderDetailDto.getProduct().getId()).isPresent())
                    throw new CommonException("ProductId not Available");
            }

            CustomerOrder customerOrder = OrderMapper.INSTANCE.toEntity(orderDto);

            if (customerOrder.getStatus() != null) {
                customerOrder.getStatus().setStatus(OrderStatusEnum.Pending);
            } else {
                OrderStatus newOrderStatus = new OrderStatus(1, OrderStatusEnum.Pending);
                customerOrder.setStatus(newOrderStatus);
            }

            OrderDto savedOrder = OrderMapper.INSTANCE.toOrderDto(customerOrderRepository.saveAndFlush(customerOrder));
            return savedOrder;
        } catch (MissingInputException e) {
            throw e;
        } catch (CommonException e) {
            throw e;
        } catch (Exception e) {
            throw new CommonException("ERROR");
        }

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

        return OrderMapper.INSTANCE.toDetailDto(orderDetailRepository.getOne(id));
    }

    @Override
    public Page<OrderDto> viewOrderHistory(Pageable pageable, int customerId) {
        return customerOrderRepository.findCustomerOrdersByCustomer(customerId, pageable)
                .map(order -> OrderMapper.INSTANCE.toOrderDto(order));
    }


}
