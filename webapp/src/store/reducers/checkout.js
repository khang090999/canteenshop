import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'

const getAvailableProductStart = (state, action) => {
    return updateObject(state, {
        error: null,
        purchaseSuccess:false,
        loading: true,
    })
}

const getAvailableProductSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        error: null,
        loading: false,
        totalPrice: 0,
        orderBill: action.product,
        page: action.page,
        sizePerPage: action.sizePerPage,
        total: action.total
    })
}
const getAvailableProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        totalPrice: 0,
        page: 1,
        sizePerPage: 10,
    })
}

const purchaseProductStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const purchaseProductSuccess = (state, action) => {
    return updateObject(state, {
        purchaseSuccess: true,
        totalPrice: 0,
        data:null,
        loading: false,
        orderBill: null,
    })
}
const purchaseProductFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,

    })
}

const addProduct = (state, action) => {
    let productDetail = { ...state.orderBill[action.productName] }
    productDetail.quantity = state.orderBill[action.productName]["quantity"] + 1;
    const updatedQuantity = updateObject(state.orderBill[action.productName], productDetail)
    let product = { ...state.orderBill }
    product[action.productName] = updatedQuantity
    const updatedProducts = updateObject(state.orderBill, product)
    const updatedState = {
        orderBill: updatedProducts,
        totalPrice: state.totalPrice + state.orderBill[action.productName]["price"],
    }
    return updateObject(state, updatedState)
}

const removeProduct = (state, action) => {
    let productDetail = { ...state.orderBill[action.productName] }
    productDetail.quantity = state.orderBill[action.productName]["quantity"] - 1;
    const updatedQuantity = updateObject(state.orderBill[action.productName], productDetail)
    let product = { ...state.orderBill }
    product[action.productName] = updatedQuantity
    const updatedProducts = updateObject(state.orderBill, product)
    const updatedState = {
        orderBill: updatedProducts,
        totalPrice: state.totalPrice - state.orderBill[action.productName]["price"],
    }
    return updateObject(state, updatedState)
}
const dissmissSuccess=(state,action)=>{
    return updateObject(state, {
        purchaseSuccess:false,
    })
}
export default function reducer(state = {
    data: null,
    totalPrice: 0,
    error: null,
    loading: false,
    orderBill: null,
    purchaseSuccess: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
}, action) {
    switch (action.type) {
        case actionTypes.GET_AVAILABLE_PRODUCT_START: return getAvailableProductStart(state, action)
        case actionTypes.GET_AVAILABLE_PRODUCT_FAILED: return getAvailableProductFail(state, action)
        case actionTypes.GET_AVAILABLE_PRODUCT_SUCCESS: return getAvailableProductSuccess(state, action)

        case actionTypes.ADD_ORDER_PRODUCT: return addProduct(state, action)
        case actionTypes.REMOVE_ORDER_PRODUCT: return removeProduct(state, action)

        case actionTypes.PURCHASE_PRODUCT_START: return purchaseProductStart(state, action)
        case actionTypes.PURCHASE_PRODUCT_FAIL: return purchaseProductFail(state, action)
        case actionTypes.PURCHASE_PRODUCT_SUCCESS: return purchaseProductSuccess(state, action)

        case actionTypes.DISSMISS_SUCCESS: return dissmissSuccess(state, action)


    }
    return state
}