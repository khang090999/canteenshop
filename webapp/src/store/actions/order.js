import * as actionTypes from './actionTypes'
import axios from '../../axios-manager'

export const getOrdersSuccess = (data, total, page, sizePerPage,startDate,endDate) => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage,
        startDate:startDate,
        endDate:endDate
    }
}

export const getOrdersFail = (error) => {
    return {
        type: actionTypes.GET_ORDER_FAILED,
        error: error
    }
}

export const getOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDER_START
    }
}

export const getOrders = (page, size,startDate, endDate) => {
    return dispatch => {
        dispatch(getOrdersStart())
        let url='/orders?page='+page+'&size='+size+'&startDate='+startDate+'&endDate='+endDate
       

        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(getOrdersSuccess(response.data.content, response.data.totalElements, page, size,startDate,endDate))
            })
            .catch(error => {
                dispatch(getOrdersFail(error))
            });
    }
}

export const getCancelReasonSuccess = (data) => {
    return {
        type: actionTypes.GET_CANCELREASON_SUCCESS,
        reason: data
    }
}

export const getCancelReasonFail = (error) => {
    return {
        type: actionTypes.GET_CANCELREASON_FAILED,
        error: error
    }
}

export const getCancelReasonStart = () => {
    return {
        type: actionTypes.GET_CANCELREASON_START
    }
}

export const getCancelReason = (orderId) => {
    return dispatch => {
        dispatch(getCancelReasonStart())
        let url='/cancelReasons?orderId='+orderId
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(getCancelReasonSuccess(response.data))
            })
            .catch(error => {
                dispatch(getCancelReasonFail(error))
            });
    }
}