import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { Panel, PanelGroup, Alert } from 'react-bootstrap'
import CheckoutModal from '../Components/Modal/CheckOutModal'
import SweetAlert from 'sweetalert-react';

class Checkout extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeKey: "1",
            checkOutShow: false,
            errorShow: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        this.props.onInitProducts()
    }
    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
    handleOrderCancel() {
        this.setState({ checkOutShow: false })
    }
    render() {
        let display = this.props.data ? Object.keys(this.props.data).map(el => (
            <Panel key={this.props.data[el][0].category.id} eventKey={this.props.data[el][0].category.id}>
                <div className="card">
                    <Panel.Heading>
                        <Panel.Title toggle>


                            <p className="header">{el}</p>


                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        {this.props.data[el].map(product => (
                            <div key={product.name} className="">
                                <div className="card" style={{ border: "none" }} >
                                    <div className="h-25 d-inline-block">
                                        <img src={product.url_img} className="img-thumbnail img-fluid" style={{ width: "100%", height: "10vw", objectFit: "cover" }} />
                                    </div>
                                    <div className="text">
                                        <h3>{product.name}</h3>
                                        <h4 className="price">
                                            Price:{product.price}
                                        </h4>

                                    </div>
                                    <button className="btn-fill btn-md btn-rectangle btn-warning" onClick={() => this.props.onProductAdded(product.name)}>ADD</button>
                                </div>
                            </div>
                        ))}
                    </Panel.Body>
                </div>
            </Panel>
        )) : null
        if (this.props.loading) {
            display = <Spinner />
        }




        let errorMsg = null
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }
        let customerBill = this.props.totalPrice ? this.props.totalPrice > 0 ?

            <div className="col-md-6">
                <div className="card">
                    <div className="header text-center">
                        <h4>Customer Bill</h4>
                    </div>
                    <div className="text-center" style={{ marginTop: "3vw" }}>
                        {Object.keys(this.props.orderBill).map(el => (
                            this.props.orderBill[el]["quantity"] > 0 ?
                                <div className="row" key={el}>
                                    <div className="col col-md-6">{el}</div>
                                    <div className="col col-md-6">
                                        <button className="btn btn-fill btn-success" onClick={() => this.props.onProductRemoved(el)}>-</button>
                                        <span className="badge" >{this.props.orderBill[el]["quantity"]}</span>
                                        <button className="btn btn-fill btn-success" onClick={() => this.props.onProductAdded(el)}>+</button>

                                    </div>
                                </div> : null
                        ))}
                    </div>
                    <hr />
                    <div className="text-center">
                        <h2>Total: {this.props.totalPrice}</h2>
                    </div>
                    <div className=" text-center " style={{ marginBottom: "2vw", marginTop: "2vw" }}>
                        <button className="btn-fill btn-warning btn-rectangle btn-lg" onClick={() => this.setState({ checkOutShow: true })}>CHECK OUT</button>
                    </div>

                </div>
            </div>
            : null : null
        return (
            <div className="container-fluid">
                <SweetAlert
                    title="SUCCESS"
                    show={this.props.orderSucces}
                    text="Order Successful"
                    type="success"
                    onConfirm={() => this.props.onInitProducts()} />                                           
                     {errorMsg}

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="header">
                                <h4>Check out</h4>
                            </div>
                            <div className="row">
                                <div className="col col-md-9 col-xs-9 h-100 col-md-offset-1 col-lg-offset-1">
                                    <PanelGroup
                                        accordion
                                        id="product-accordination"
                                        activeKey={this.state.activeKey}
                                        onSelect={this.handleSelect}
                                    >
                                        {display}
                                    </PanelGroup>
                                </div>

                            </div>
                        </div>
                    </div>
                    {customerBill}
                </div>
                <CheckoutModal
                    show={this.state.checkOutShow}
                    hide={() => this.handleOrderCancel()}
                    title="Customer Bill"
                    total={this.props.totalPrice}
                    handleCheckout={() => alert('aa')}
                    orderBill={this.props.orderBill}
                    handleCheckout={() => {
                        this.setState({ checkOutShow: false, errorShow: true })
                        this.props.onCheckOut(localStorage.getItem('username'), this.props.orderBill)
                    }} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.checkout.loading,
        data: state.checkout.data,
        error: state.checkout.error,
        totalPrice: state.checkout.totalPrice,
        orderBill: state.checkout.orderBill,
        orderSucces: state.checkout.purchaseSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.getAvailableProduct()),
        onProductAdded: (productName) => dispatch(actions.addOrderProduct(productName)),
        onProductRemoved: (productName) => dispatch(actions.removeOrderProduct(productName)),
        onCheckOut: (staff, order) => dispatch(actions.purchaseProduct(staff, order)),
        onDissmissSuccess: () => dispatch(actions.dissmissSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)