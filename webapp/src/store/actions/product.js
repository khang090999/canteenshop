import * as actionTypes from './actionTypes'
import axios from '../../axios-manager'
export const getProductSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_PRODUCT_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getProductFail = (error) => {
    return {
        type: actionTypes.GET_PRODUCT_FAILED,
        error: error
    }
}

export const getProductStart = () => {
    return {
        type: actionTypes.GET_PRODUCT_START
    }
}

export const getProduct = (page, size,search) => {
    return dispatch => {
        dispatch(getProductStart())
        let url='/products'
        if(search){
            url+='?page='+page+'&size='+size+"&name="+search
        }else {
            url+='?page='+page+'&size='+size
        }
        console.log(url)
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(getProductSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(getProductFail(error))
            });
    }
}


export const updateProductStart =()=>{
    return({
        type: actionTypes.UPDATE_PRODUCT_START
    })
} 
export const updateProductFail =(error)=>{
    return({
        type: actionTypes.UPDATE_PRODUCT_FAILED,
        error:error
    })
} 
export const updateProductSuccess =()=>{
    return({
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    })
} 
export const updateProduct = (data,categoryList) => {
    return dispatch => {
        dispatch(updateProductStart()) 
        categoryList.forEach(element => {
            if(element.id==data.category){
                data.category=element
            }
        });
        axios.put('products/'+data["id"]+"/data",data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(updateProductSuccess())
            })
            .catch(error => {
                dispatch(updateProductFail(error))
            });
    }
}

export const addProductStart =()=>{
    return({
        type: actionTypes.ADD_PRODUCT_START
    })
} 
export const addProductFail =(error)=>{
    return({
        type: actionTypes.ADD_PRODUCT_FAILED,
        error:error
    })
} 
export const addProductSuccess =()=>{
    return({
        type: actionTypes.ADD_PRODUCT_SUCCESS,
    })
} 
export const addProduct = (data,categoryList) => {
    return dispatch => {
        dispatch(addProductStart())    
        categoryList.forEach(element => {
            if(element.id==data.category){
                data.category=element
            }
        });
        axios.post('products/',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(addProductSuccess())
            })
            .catch(error => {
                dispatch(addProductFail(error))
            });
    }
}


export const updateImageStart =()=>{
    return({
        type: actionTypes.UPDATE_IMAGE_START
    })
} 
export const updateImageFail =(error)=>{
    return({
        type: actionTypes.UPDATE_IMAGE_FAILED,
        error:error
    })
} 
export const updateImageSuccess =()=>{
    return({
        type: actionTypes.UPDATE_IMAGE_SUCCESS,
    })
} 
export const updateImage = (id,url) => {
    return dispatch => {
        dispatch(updateImageStart()) 
        axios.put('products/'+id+"/updateImg",{imgUrl:url},{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(updateImageSuccess())
            })
            .catch(error => {
                dispatch(updateImageFail(error))
            });
    }
}