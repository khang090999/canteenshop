import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../ultility'


const getStatisticStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    revenue:0,
    lables:null,
    quantity:null
  })
}
const getStatisticSuccess = (state, action)=>{
  return updateObject(state,{
      quantity: action.quantity,
      lables:action.lables,
      error:null,
      loading:false,
      revenue:action.revenue
  })
}
const getStatisticFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      
  })
}


export default function reducer(state = {
    quantity: null,
    lables:null,
    revenue:0,
    error:null,
    loading:false,
    
}, action) {
  switch(action.type){
    case actionTypes.GET_STATISTIC_START: return getStatisticStart(state, action)
    case actionTypes.GET_STATISTIC_FAILED: return getStatisticFail(state, action)
    case actionTypes.GET_STATISTIC_SUCCESS: return getStatisticSuccess(state, action)

   
}
return state
}
 