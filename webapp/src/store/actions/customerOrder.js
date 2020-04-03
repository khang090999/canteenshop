import * as actionTypes from './actionTypes'
import axios from '../../axios-staff'

export const getCustomerOrderSuccess = (data) => {
    return {
        type: actionTypes.GET_CUSTOMER_ORDER_SUCCESS,
        data: data,
    }
}


export const getCustomerOrderFail = (error) => {
    return {
        type: actionTypes.GET_CUSTOMER_ORDER_FAIL,
        error: error
    }
}

export const getCustomerOrderStart = () => {
    return {
        type: actionTypes.GET_CUSTOMER_ORDER_START
    }
}

export const getCustomerOrder = (status,startDate,endDate) => {
    return dispatch => {
        dispatch(getCustomerOrderStart())
        axios.get('/orders/searchInPeriodByStatus?From='+startDate+'&Status='+status+'&To='+endDate, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
            .then(response => {
                dispatch(getCustomerOrderSuccess(response.data.content))
            })
            .catch(error => {
                dispatch(getCustomerOrderFail(error))
            });
    }
}

