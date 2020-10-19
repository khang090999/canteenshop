import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import ThemeOptions from './ThemeOptions';
import Layout from './Layout';
import Auth from './Auth';
import category from './category'
import product from './product'
import statistic from './statistic'
import customerAction from './customerAction'
import staff from './staff'
import order from './order'
import orderStaff from './orderStaff'
import staff_profile from './staff_profile'
import checkout from './checkout'
import customerOrder from './customerOrder'
export default {
  Auth,
  ThemeOptions,
  Layout,
  category,
  product,
  statistic,
  staff,
  order,
  orderStaff,
  customerAction,
  staff_profile,
  checkout,
  customerOrder,
  form: formReducer,
};