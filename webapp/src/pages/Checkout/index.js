import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { Navbar, FormGroup, FormControl, Alert } from 'react-bootstrap'
import CheckoutModal from '../Components/Modal/CheckOutModal'
import SweetAlert from 'sweetalert-react';
import Product from '../../components/Product/Product'
import Pagination from "react-js-pagination";
class Checkout extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            checkOutShow: false,
            errorShow: false,
            searchValue: '',
            activePage: 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.fetchData(pageNumber-1, this.props.sizePerPage,this.state.searchValue)
      }
    
    componentDidMount() {
        this.fetchData()
    }
    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
    fetchData(page = this.props.page,sizePerPage = this.props.sizePerPage,searchValue = this.state.searchValue) {
        this.props.onInitProducts(page,sizePerPage,searchValue)
    }
    handleOrderCancel() {
        this.setState({ checkOutShow: false })
    }
    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }
    handleSearch() {
        this.setState({
            errorShow: false,
            activePage: 1
        })
        this.fetchData(0, 10,this.state.searchValue)
    }
    render() {
        let display = this.props.data ? 
        <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
            {Object.keys(this.props.data).map(el => (
            this.props.data[el].map(product => (
                <Product key={product.id}
                    product={product}
                    addProduct={() => this.props.onProductAdded(product.name)}
                />
            ))
        ))}
        </div>
        <div className="col-md-6 col-md-offset-4">
        <Pagination className="text-center" activePage={this.state.activePage} itemsCountPerPage={this.props.sizePerPage} totalItemsCount={this.props.totalSize} pageRangeDisplayed={5} onChange={this.handlePageChange.bind(this)}/>
        </div>
        </div> : null
        if (this.props.loading) {
            display = <Spinner />
        }

        let errorMsg = null
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }
        let customerBill = this.props.totalPrice ? this.props.totalPrice > 0 ?

            <div className="col-md-4">
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
                        <h3>Total: <span className="text-warning">{this.props.totalPrice} VND</span></h3>
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
                    <div className="col-md-8">
                        <div className="card">
                            <div className="header">
                                <h4>Check out</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-9 col-lg-6 col-sm-12">
                                    <Navbar.Form pullLeft>
                                        <FormGroup>
                                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="search by name" />
                                            <button onClick={() => this.handleSearch()} className="btn btn-simple "><span><i className="fa fa-search"></i></span></button>
                                        </FormGroup>
                                    </Navbar.Form>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col col-md-12 col-xs-12 h-100">
                                    {display}
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
        orderSucces: state.checkout.purchaseSuccess,
        totalSize: state.checkout.total,
        page: state.checkout.page,
        sizePerPage: state.checkout.sizePerPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: (page, size,search) => dispatch(actions.getAvailableProduct(page, size,search)),
        onProductAdded: (productName) => dispatch(actions.addOrderProduct(productName)),
        onProductRemoved: (productName) => dispatch(actions.removeOrderProduct(productName)),
        onCheckOut: (staff, order) => dispatch(actions.purchaseProduct(staff, order)),
        onDissmissSuccess: () => dispatch(actions.dissmissSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)