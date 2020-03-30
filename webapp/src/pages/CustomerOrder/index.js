import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { Tabs, Tab } from 'react-bootstrap'
import SweetAlert from 'sweetalert-react';
import OrderList from './OrderList'
import moment from 'moment'

class CustomerOrder extends Component {
    componentDidMount(){
        this.props.onGetOrder("Completed", moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
    }
    render() {
        return (
           
            <Tabs defaultActiveKey="Completed" style={{overflow:'hidden'}} onSelect={k=>setTimeout(function(){ this.props.onGetOrder(k, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')) }, 3000)} id="orders">
                <Tab eventKey="Completed" title="Pending" >
                  <OrderList status="Completed"  title='Pending Order' orders={this.props.orders}/>
                </Tab>
                <Tab eventKey="Confirmed" title="Confirmed" >
                <OrderList status="Confirmed"  title='Confirmed Order' orders={this.props.orders}/>
                </Tab>
                <Tab eventKey="Canceled" title="Canceled">
                <OrderList status="Canceled" title='Canceled Order' orders={this.props.orders}/>
                </Tab>
                
            </Tabs>
           
        )
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onGetOrder: (status,startDate,endDate) => dispatch(actions.getCustomerOrder(status,startDate,endDate)),
    }
}
const mapStateToProps = state => {
    return {
        loading: state.customerOrder.loading,
        orders: state.customerOrder.data,
        error: state.customerOrder.error,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrder)