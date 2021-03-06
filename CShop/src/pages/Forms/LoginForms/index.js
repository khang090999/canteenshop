import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.email = 'Username is required';}
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  if (!values.password) {
    errors.password = 'Password is required';}
  // } else if (values.password.length < 6) {
  //   errors.password = 'Must be 6 characters or more';
  // }
  return errors;
};

const StackedForm = ({
  submitting,
  handleSubmit,
}) => (
  <div className="card">
    <div className="header text-center">
      <h4>Login</h4>
    </div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label">Username</label>
          <Field
            name="username"
            type="text"
            placeholder="Username"
            component={renderField} />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={renderField} />
        </div>


        <button type="submit" className="btn btn-fill btn-info" disabled={submitting}>Login</button>
      </form>
    </div>
  </div>
);

export default reduxForm({
  form: 'stackedForm',
  validate
})(StackedForm)