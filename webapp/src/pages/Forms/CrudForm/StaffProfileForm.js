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


const StaffProfileForm = ({
    handleSubmit,
    handleCancel,
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
    form: 'staffProfileForm',
    validate
})(StaffProfileForm)
