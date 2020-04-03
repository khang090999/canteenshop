import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className={this.isPathActive('/usermng') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-users"></i>
            <p>
              User Management
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
              <li
                  className={
                    this.isPathActive("/usermng/staff") ? "active" : null
                  }
                >
                  <Link to="/usermng/staff">Staff</Link>
                </li>
                <li
                  className={
                    this.isPathActive("/usermng/customer") ? "active" : null
                  }
                >
                  <Link to="/usermng/customer">Customer</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={this.isPathActive('/order') ? 'active' : null}>
          <Link to="/order">
            <i className="fa fa-shopping-cart"></i>
            <p>List of Orders</p>
          </Link>
        </li>
        <li className={this.isPathActive('/tables') || this.state.tableMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ tableMenuOpen: !this.state.tableMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-box1"></i>
            <p>Product Management <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.tableMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/product/categories') ? 'active' : null}>
                  <Link to="/product/categories">Categories</Link>
                </li>
                <li className={this.isPathActive('/product/beverages') ? 'active' : null}>
                  <Link to="/product/beverages">Beverages</Link>
                </li>
              </ul>
            </div>
          </Collapse>
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