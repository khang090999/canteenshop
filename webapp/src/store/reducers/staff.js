//This class used to set state for staff actions

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../ultility";
import { updateCategoryStart } from "../actions/category";

//Get Staff Data

const getStaffStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    deleteSuccess: false,
    updateSuccess: false,
    addSuccess: false
  });
};

const getStaffSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  });
};

const getStaffFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20
  });
};

// update staff - change status isActive

const updateStaffStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    updateSuccess: false
  });
};

const updateStaffSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    updateSuccess: true
  });
};

const updateStaffFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20
  });
};

// add Staff


const addStaffStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addSuccess: false,
  })
}
const addStaffSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    addSuccess: true
  })
}
const addStaffFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20,
  })
}


export default function reducer(
  state = {
    data: null,
    total: 0,
    error: null,
    loading: false,
    page: 1,
    sizePerPage: 20,
    updateSuccess: false,
    addSuccess: false
  },
  action
) {
  switch (action.type) {
    case actionTypes.GET_STAFF_START:
      return getStaffStart(state, action);
    case actionTypes.GET_STAFF_FAILED:
      return getStaffFail(state, action);
    case actionTypes.GET_STAFF_SUCCESS:
      return getStaffSuccess(state, action);

    case actionTypes.UPDATE_STAFF_START:
      return updateStaffStart(state, action);
    case actionTypes.UPDATE_STAFF_FAILED:
      return updateStaffFail(state, action);
    case actionTypes.UPDATE_STAFF_SUCCESS:
      return updateStaffSuccess(state, action);

    case actionTypes.ADD_STAFF_START:
      return addStaffStart(state, action);
    case actionTypes.ADD_STAFF_FAILED:
      return addStaffFail(state, action);
    case actionTypes.ADD_STAFF_SUCCESS:
      return addStaffSuccess(state, action);
  }
  return state;
}
