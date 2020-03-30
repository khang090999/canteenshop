import React from 'react'
import { Modal } from 'react-bootstrap'
import ProductForm from '../../Forms/CrudForm/ProductForm'

const productModal=(props)=>{
    return (
        <Modal backdrop="static" show={props.show} onHide={props.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductForm defaultCategory={props.defaultCategory} defaultAvailable={props.defaultAvailable} dataList={props.dataList} handleCancel={props.hide} initialValues={props.initialValues} onSubmit={props.submitProduct} />
                    </Modal.Body>
                </Modal>
    )
}
export default productModal