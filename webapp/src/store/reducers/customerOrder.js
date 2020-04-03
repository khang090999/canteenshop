import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'

const getCustomerOrderStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const getCustomerOrderSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        error: null,
        loading: false,
    })
}
const getCustomerOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,

    })
}





export default function reducer(state = {
    data: null,
    error: null,
    loading: false,
    

}, action) {
    switch (action.type) {
        case actionTypes.GET_CUSTOMER_ORDER_START: return getCustomerOrderStart(state, action)
        case actionTypes.GET_CUSTOMER_ORDER_FAIL: return getCustomerOrderFail(state, action)
        case actionTypes.GET_CUSTOMER_ORDER_SUCCESS: return getCustomerOrderSuccess(state, action)

    }
    return state
}