import * as actionTypes from './actionTypes'
import axios from '../../axios-manager'
export const getStatisticSuccess = (quantity,lables,revenue) => {
    return {
        type: actionTypes.GET_STATISTIC_SUCCESS,
        quantity: quantity,
        lables:lables,
        revenue:revenue
    }
}

export const getStatisticFail = (error) => {
    return {
        type: actionTypes.GET_STATISTIC_FAILED,
        error: error
    }
}

export const getStatisticStart = () => {
    return {
        type: actionTypes.GET_STATISTIC_START
    }
}

export const getStatistic = (startDate,endDate) => {
    return dispatch => {
        dispatch(getStatisticStart())
        let url='/statistic?endDate='+endDate+'&startDate='+startDate
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                let productList= response.data.productList
                productList.sort(function(a, b){return b.quantity - a.quantity})
                let data=productList.slice(0,4)
                let totalOther=0
                let other=productList.slice(4,productList.length)
                for (var i = 0; i < other.length; i++) {  //loop through the array
                    totalOther += other[i].quantity;  //Do the math!
                }
                let quantity=[]
                let lables=[]
                data.push({quantity:totalOther,productName:"other"})
                data.forEach(element => {
                    quantity.push(element.quantity)
                    lables.push(element.productName)
                });
                dispatch(getStatisticSuccess(quantity,lables, response.data.revenue))
            })
            .catch(error => {
                dispatch(getStatisticFail(error))
            });
    }
}


