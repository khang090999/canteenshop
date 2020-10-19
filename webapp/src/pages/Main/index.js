import React, { Component } from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../store/reducers/Layout';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import StaffSideBar from '../../components/SideBar/StaffLeftBar';

/**
 * Pages
 */
import Dashboard from '../Dashboard';
import UserProfile from '../UserProfile';
import Auth from '../Auth/Auth';
import AuthStaff from '../Auth/StaffAuth';
import Logout from '../Auth/Logout/Logout'
import StaffLogout from '../Auth/Logout/LogoutStaff'
import ChangePassword from '../Auth/ChangePassword/ChangePassword'
import * as actions from '../../store/actions/index'
import Product from '../Product';
import UserManagement from '../UserManagement'
import Order from '../Order/Order';
import OrderStaffSide from '../OrderStaffSide/OrderStaff';
import CheckOut from '../Checkout'
import CustomerOrder from '../CustomerOrder'

class Main extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  render() {
    this.props.history.listen(() => {
      if (this.props.mobileNavVisibility === true) {
        this.props.hideMobileMenu();
      }
    })

    let display = (
      <div className="wrapper">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      </div>
    )
    if (this.props.isAuthenticated ) {
      if(localStorage.getItem("role")=="ROLE_MANAGER"){
      display = (
        <div className="wrapper">
          <div className="close-layer" onClick={this.props.hideMobileMenu}></div>
          <SideBar />

          <div className="main-panel">
            <Header />
            <Route path="/" exact component={Dashboard} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route path="/order" component={Order} />
            <Route path="/product" component={Product} />
            <Route path="/usermng" component={UserManagement} />
            <Route path="/changepw" component={ChangePassword} />
            <Footer />
          </div>
        </div>
      )
    }
    else if(localStorage.getItem("role")=="ROLE_STAFF"){
      display = (
        <div className="wrapper">
          <div className="close-layer" onClick={this.props.hideMobileMenu}></div>
          <StaffSideBar />

          <div className="main-panel">
            <Header />
            <Route path="/" exact component={CheckOut} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/auth" component={Auth} />
            <Route path="/orderStaff" component={OrderStaffSide} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/logout" component={Logout} />
            <Footer />
          </div>
        </div>
        )
    }else{
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiryDate')
      localStorage.removeItem('userId')
      localStorage.removeItem('role')
      localStorage.removeItem('username')
  
    }
  }
    return (
      <div className={cx({
        'nav-open': this.props.mobileNavVisibility === true
      })}>
        {display}
      </div>
    )
  };
}

const mapStateToProp = state => {
  return {
    mobileNavVisibility: state.Layout.mobileNavVisibility,
    isAuthenticated: state.Auth.token !== null,
    role:state.Auth.role
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideMobileMenu: () => dispatch(setMobileNavVisibility(false)),
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));