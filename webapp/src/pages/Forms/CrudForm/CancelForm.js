import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import renderField from 'components/FormInputs/renderField';
const  { DOM: { textarea, input} } = React

const CancelForm = ({
    handleSubmit,
    handleCancel
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Cancel Reason:</label>
                        <Field
                            name="reason"
                            component="textarea" />
                           
                    </div>
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Back
                        </button>
                        &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Submit 
                        </button>
                </form>
            </div>
        </div>
    );

export default reduxForm({
    form: 'cancelForm'
})(CancelForm)