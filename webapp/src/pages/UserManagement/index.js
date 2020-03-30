import React from 'react';
import { Route } from 'react-router-dom';
import Staff from '../Staff';
import Customer from '../Customer';

const UserManagement = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/staff`} component={Staff} />
    <Route path={`${match.url}/customer`} component={Customer} />
  </div>
);

export default UserManagement;