import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Product name is required';
    }
    if (!values.description) {
        errors.description = 'Product description is required';
    }
    if (!values.category) {
        errors.category = 'Product category is required';
    }
    if (!values.price) {
        errors.price = 'Product price is required';
    } else if (isNaN(values.price)) {
        errors.price = 'Invalide price';
    } else if (values.price <= 0) {
        errors.price = 'Price must be a positive number';

    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }
    return errors;
};

const ProductForm = ({
    handleSubmit,
    handleCancel,
    dataList,
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Product name:</label>
                        <Field
                            name="name"
                            type="text"
                            placeholder="Product name"
                            component={renderField} />

                    </div>
                    <div className="form-group">
                        <label className="control-label">Price:</label>
                        <Field
                            name="price"
                            type="text"
                            placeholder="Price"
                            component={renderField} />

                    </div>
                    <div className="form-group">
                        <label className="control-label">Description:</label>
                        <Field
                            name="description"
                            type="text"
                            placeholder="Description"
                            component={renderField} />

                    </div>
                    <div className="form-group">
                        <label className="control-label">Category:</label>
                        <Field
                            name="category"
                            component="select"
                            className="form-control"
                        > 
                        <option key="-1"></option>
                            {
                                dataList.map(el =>
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            }
                        </Field>

                    </div>
                    <div className="form-group">
                        <label className="control-label">Available:</label>
                        <Field
                            name="available"
                            component="select"
                            className="form-control"
                        >
                            <option key="0" value={false}>False</option>
                            <option key="1" value={true}>True</option>
                        </Field>


                    </div>
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Cancel
                        </button>
                    &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Save
                        </button>
                </form>
            </div>
        </div>
    )

export default reduxForm({
    form: 'productForm',
    validate,
})(ProductForm)