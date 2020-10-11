import * as actionTypes from './actionTypes'
import axios from '../../axios-staff'

export const getAvailableProductSuccess = (data,product,total,page,sizePerPage) => {
    return {
        type: actionTypes.GET_AVAILABLE_PRODUCT_SUCCESS,
        data: data,
        product:product,
        total:total,
        page: page,
        sizePerPage: sizePerPage
    }
}


export const getAvailableProductFail = (error) => {
    return {
        type: actionTypes.GET_AVAILABLE_PRODUCT_FAILED,
        error: error
    }
}

export const getAvailableProductStart = () => {
    return {
        type: actionTypes.GET_AVAILABLE_PRODUCT_START
    }
}

export const getAvailableProduct = (page, size,search) => {
    return dispatch => {
        dispatch(getAvailableProductStart())
        let url = '/products/search?Availability=true'
        if (search) {
        url += "&page=" + page + "&size=" + size +"&ProductName=" + search;
        }else{
            url += "&page=" + page + "&size=" + size;
        }
        axios.get(url, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
            .then(response => {
                let category={}
                let product={}
                response.data.content.forEach(element => {
                    product[element.name]={
                        "id":element.id,
                        "quantity":0,
                        "price":element.price
                    }
                    if(!category.hasOwnProperty(element.category.name)){
                        category[element.category.name]=[element]

                    }else{
                        category[element.category.name].push(element)
                    }
                });
                dispatch(getAvailableProductSuccess(category,product,response.data.totalElements,page,size))
            })
            .catch(error => {
                dispatch(getAvailableProductFail(error))
            });
    }
}
export const addOrderProduct = (name) =>{
    return{
        type: actionTypes.ADD_ORDER_PRODUCT,
        productName: name
    }
}

export const removeOrderProduct = (name) =>{
    return{
        type: actionTypes.REMOVE_ORDER_PRODUCT,
        productName: name
    }
}

export const purchaseProductSuccess = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_SUCCESS,
    }
}

export const purchaseProductFail = (error) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_FAIL,
        error: error
    }
}

export const purchaseProductStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_START
    }
}

export const purchaseProduct = (staff,order) => {
    return dispatch => {
        dispatch(purchaseProductStart())
        let orderDetail=[]
        Object.keys(order).map(el=>(
        order[el]["quantity"]>0?orderDetail.push(order[el]):null
        )
        )
        
        let data={cart:{
            productList:orderDetail,
            staffUsername:staff
        },
        location:"here",
        note:"",
        status:{id:4}
    }
        axios.post('/staffs/checkout',data, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
            .then(response =>
                dispatch(purchaseProductSuccess())
            )
            .catch(error => {
                dispatch(purchaseProductFail(error))
            });
    }
}
export const dissmissSuccess=()=>{
    return {
        type: actionTypes.DISSMISS_SUCCESS
    }
}