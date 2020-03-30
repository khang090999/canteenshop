import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../ultility'


const getStaffProfileStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    updateSuccess:false,
  })
}
const getStaffProfileSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      error:null,
      loading:false,
  })
}
const getStaffProfileFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      sizePerPage:20,
      
  })
}


const updateStaffProfileStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateStaffProfileSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateStaffProfileFail = (state, action) =>{
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
    error:null,
    loading:false,
    updateSuccess:false,
}, action) {
  switch(action.type){
    case actionTypes.GET_STAFF_PROFILE_START: return getStaffProfileStart(state, action)
    case actionTypes.GET_STAFF_PROFILE_FAILED: return getStaffProfileFail(state, action)
    case actionTypes.GET_STAFF_PROFILE_SUCCESS: return getStaffProfileSuccess(state, action)

    case actionTypes.UPDATE_STAFF_PROFILE_START: return updateStaffProfileStart(state, action)
    case actionTypes.UPDATE_STAFF_PROFILE_FAILED: return updateStaffProfileFail(state, action)
    case actionTypes.UPDATE_STAFF_PROFILE_SUCCESS: return updateStaffProfileSuccess(state, action)
   
}
return state
}
 