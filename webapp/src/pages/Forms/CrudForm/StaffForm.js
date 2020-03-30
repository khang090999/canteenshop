import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'Address  is required';
    }else if(values.address.length<3){
        errors.address = 'Must be 3 characters or more';
    }
    if (!values.firstName) {
        errors.firstName = 'First name is required';
    }else if(values.firstName.length>100){
        errors.firstName = 'First name length is less than 100';
    }
    if (!values.lastName) {
        errors.lastName = 'Last name is required';
    }else if(values.lastName.length>50){
        errors.lastName = 'Last name length is less than 50';
    }
    if (!values.username) {
        errors.username = 'Username is required';
    }else if(values.username.length<6){
        errors.username = 'Must be 6 characters or more';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }else if(values.password.length<6){
        errors.password = 'Must be 6 characters or more';
    }
    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^(0)[0-9]{9}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone';
    } 
    if (!values.socialId) {
        errors.socialId = 'Social ID is required';
    } else if (!/^[0-9]{12}$/i.test(values.socialId)) {
        errors.socialId = 'Invalid Social ID';
    } 
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.dob) {
        errors.dob = 'Date of birth is required';
    } 
    return errors;
};


const StaffForm = ({
    handleSubmit,
    handleCancel,
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div>
                            <label className="control-label">First Name</label>
                            <div>
                                <Field
                                    name="firstName"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter first name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Last Name</label>
                            <div>
                                <Field
                                    name="lastName"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter last Name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Username</label>
                            <div>
                                <Field
                                    name="username"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Password</label>
                            <div>
                                <Field
                                    name="password"
                                    component={renderField}
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Email</label>
                            <div>
                                <Field
                                    name="email"
                                    component={renderField}
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Phone</label>
                            <div>
                                <Field
                                    name="phone"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Address</label>
                            <div>
                                <Field
                                    name="address"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter address"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="control-label">Date of birth</label>
                            <div>
                                <Field
                                    name="dob"
                                    component="input"
                                    className="form-control"
                                    type="date"
                                />
                            </div>

                        </div>
                        <div>
                            <label className="control-label">Social ID</label>
                            <div>
                                <Field
                                    name="socialId"
                                    component={renderField}
                                    type="text"
                                    placeholder="Enter social ID"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Gender</label>
                            <div>

                                <Field name="gender" component={renderField}
                                    type="radio" value="M"
                                    label='Male'

                                />

                                <br />

                                <Field name="gender" component={renderField} label='Female'
                                    type="radio" value="F"
                                />

                            </div>
                        </div>
                    </div>
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Cancel
                        </button>
                    &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success" id="btnValidate">
                        <span className="btn-label">
                        </span> Save
                        </button>
                </form>
            </div>
        </div>
    );

export default reduxForm({
    form: 'staffForm',
    validate
})(StaffForm)
