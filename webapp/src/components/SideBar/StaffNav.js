import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        
        <li className={location.pathname === '/checkout' ? 'active' : null}>
          <Link to="/checkout">
            <i className="fa fa-shopping-cart"></i>
            <p>Check Out</p>
          </Link>
        </li>
        <li className={this.isPathActive('/orderStaff') ? 'active' : null}>
          <Link to="/orderStaff">
            <i className="fa fa-shopping-cart"></i>
            <p>List of Orders</p>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <i className="fa fa-sign-out"></i>
            <p>Logout</p>
          </Link>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);