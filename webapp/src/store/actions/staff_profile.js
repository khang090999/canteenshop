import * as actionTypes from './actionTypes'
import axios from '../../axios-staff'
export const getStaffProfileSuccess = (data) => {

    return {
        type: actionTypes.GET_STAFF_PROFILE_SUCCESS,
        data: data
    }
}

export const getStaffProfiletFail = (error) => {
    return {
        type: actionTypes.GET_STAFF_PROFILE_FAILED,
        error: error
    }
}

export const getStaffProfileStart = () => {
    return {
        type: actionTypes.GET_STAFF_PROFILE_START
    }
}

export const getStaffProfile = (username) => {
    return dispatch => {
        dispatch(getStaffProfileStart())
        let url='/staffs/profile?Username='+username
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(getStaffProfileSuccess(response.data))
            })
            .catch(error => {
                dispatch(getStaffProfiletFail(error))
            });
    }
}


export const updateStaffProfileStart =()=>{
    return({
        type: actionTypes.UPDATE_STAFF_PROFILE_START
    })
} 
export const updateStaffProfileFail =(error)=>{
    return({
        type: actionTypes.UPDATE_STAFF_PROFILE_FAILED,
        error:error
    })
} 
export const updateStaffProfileSuccess =()=>{
    return({
        type: actionTypes.UPDATE_STAFF_PROFILE_SUCCESS,
    })
} 
export const updateStaffProfile = (data) => {
    return dispatch => {
        dispatch(updateStaffProfileStart()) 
        axios.post('staffs/profile',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(updateStaffProfileSuccess())
                console.log(response)
            })
            .catch(error => {
                dispatch(updateStaffProfileFail(error))
            });
    }
}

