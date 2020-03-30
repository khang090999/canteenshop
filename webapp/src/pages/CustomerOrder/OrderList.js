import React, { Component } from 'react';
import { Panel, PanelGroup } from 'react-bootstrap'


class OrderList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            activeKey: "1",
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }
    render() {
        let display = this.props.orders ? this.props.orders.map(el => (
            <Panel key={el.id} eventKey={el.id}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <div className="row">
                            <div className="col col-md-4"><h4>&nbsp;&nbsp;&nbsp;{el.customer.appUser.firstName} {el.customer.appUser.lastName}</h4></div>
                            <div className=" col col-md-4"><h4>&nbsp;&nbsp;&nbsp;{el.totalPrice} </h4></div>
                        </div>

                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <div className="row">
                        <div className="col-md-9">

                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {el.orderDetails.map(prod => (
                                        <tr key={prod.name}>
                                            <td>{prod.product.name}</td>
                                            <td>{prod.quantity}</td>
                                            <td>{prod.product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn"> Cancel</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn btn-success">Confirm</button>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        )) : null
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="header">
                            <h4>{this.props.title}</h4>
                        </div>
                        <div className="row">
                            <div className="col col-md-12 col-xs-12 h-100 col-md-offset-1 col-lg-offset-1">
                                <PanelGroup
                                    accordion
                                    id="product-accordination"
                                    activeKey={this.state.activeKey}
                                    onSelect={this.handleSelect}
                                >
                                    <div className="row">
                                        <div className="header col col-md-4">Customer Name</div>
                                        <div className="header col col-md-4">Total Price</div>
                                    </div>
                                    <hr />
                                    {display}
                                </PanelGroup>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default OrderList
