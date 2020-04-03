import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../ultility'


const getProductStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false,
    updateImageSuccess:false
  })
}
const getProductSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getProductFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
      
  })
}


const updateProductStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateProductSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateProductFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addProductStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addProductSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      addSuccess:true
  })
}
const addProductFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updateImageStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateImageSuccess:false,
  })
}
const updateImageSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateImageSuccess:true
  })
}
const updateImageFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}
export default function reducer(state = {
    data: null,
    total:0,
    error:null,
    loading:false,
    page:1,
    sizePerPage:20,
    updateSuccess:false,
    addSuccess:false,
    updateImageSuccess:false
    
}, action) {
  switch(action.type){
    case actionTypes.GET_PRODUCT_START: return getProductStart(state, action)
    case actionTypes.GET_PRODUCT_FAILED: return getProductFail(state, action)
    case actionTypes.GET_PRODUCT_SUCCESS: return getProductSuccess(state, action)

    case actionTypes.UPDATE_PRODUCT_START: return updateProductStart(state, action)
    case actionTypes.UPDATE_PRODUCT_FAILED: return updateProductFail(state, action)
    case actionTypes.UPDATE_PRODUCT_SUCCESS: return updateProductSuccess(state, action)

    case actionTypes.ADD_PRODUCT_START: return addProductStart(state, action)
    case actionTypes.ADD_PRODUCT_FAILED: return addProductFail(state, action)
    case actionTypes.ADD_PRODUCT_SUCCESS: return addProductSuccess(state, action)

    case actionTypes.UPDATE_IMAGE_START: return updateImageStart(state, action)
    case actionTypes.UPDATE_IMAGE_FAILED: return updateImageFail(state, action)
    case actionTypes.UPDATE_IMAGE_SUCCESS: return updateImageSuccess(state, action)
   
}
return state
}
 