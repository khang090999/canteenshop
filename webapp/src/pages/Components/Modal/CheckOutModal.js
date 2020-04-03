import React from "react";
import { Modal } from "react-bootstrap";

const checkoutModal = props => {

    return (
        <Modal backdrop="static" show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.orderBill?Object.keys(props.orderBill).map(el => (
                            props.orderBill[el]["quantity"]>0?
                            <tr key={el}>
                                <td>{el}</td>
                                <td>{props.orderBill[el]["quantity"]}</td>
                                <td>{props.orderBill[el]["price"]}</td>
                            </tr>:null
                        )):null}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <h3>Total: {props.total}</h3>
                </div>
                <button onClick={props.hide} type="button" className="btn btn-wd btn-default" >
                    <span className="btn-label">
                    </span> Cancel
                        </button>
                &nbsp;&nbsp;
                    <button onClick={props.handleCheckout} type="button" className="btn btn-wd btn-success ">
                    <span className="btn-label">
                    </span> Check out
                        </button>
            </Modal.Footer>
        </Modal>
    );
};
export default checkoutModal;
