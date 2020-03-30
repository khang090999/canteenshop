import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { Alert } from 'react-bootstrap'
import ReasonModal from '../Components/Modal/ReasonModal'
import OrderDetailModal from '../Components/Modal/OrderDetailModal';
import DateRangePicker from '../Forms/ExtendedForms/DatePicker'
import "react-datetime/css/react-datetime.css";


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: null,
            errorShow: false,
            showDetail: false,
            detailData: null,
            showReason: false,
            reasonData: null,
            cancelDetail: false,
            cancelReason: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.formatDate = this.formatDate.bind(this)
        this.showStatus = this.showStatus.bind(this);
        this.setStateReasonData = this.setStateReasonData.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.setStateDetailData = this.setStateDetailData.bind(this);
        this.handleDetailCancel = this.handleDetailCancel.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, startDate = this.props.startDate, endDate = this.props.endDate) {
        this.props.onFetchData(page - 1, sizePerPage, startDate, endDate)
    }
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.props.startDate, this.props.endDate);
    }

    changeDate(startD, endD) {
        let start,end;
        if(startD != null) {
            start = this.formatDate(startD.toDate()) + ' 00:00:00'
        }
        if(endD != null) {
            end = this.formatDate(endD.toDate()) + ' 23:59:59'
        }
        this.fetchData(1, 20, start, end)

    }
    formatDate(date) {
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var month = (monthIndex + 1) < 10 ? '0' + (monthIndex + 1) : (monthIndex + 1)
        return (year + "-" + month + "-" + day)
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.props.startDate,this.props.endDate);
    }
    showStatus(cell, row) {
        if (cell != null) {
            if (cell.status === "Canceled") {
                return <button className="btn btn-fill btn-warning" onClick={this.setStateReasonData.bind(this, row.id)} >{cell.status}</button>
            }
            return <a className="btn btn-fill btn-success" >{cell.status}</a>
        }
        return cell + '';
    }
    showStaffName(cell, row) {
        if (cell != null) {
            return cell.appUser.firstName + " " + cell.appUser.lastName
        }
    }
    setStateReasonData(id, e) {
        this.props.onGetCancelReason(id)
        this.setState(state => ({
            showReason: true
        }))
        e.preventDefault();
    }
    handleReasonCancel = () => {
        this.setState({
            showReason: false,
            reasonData: null,
            cancelReason: true,
        })
    }
    showDetail(cell, row) {
        return <a href="#" onClick={this.setStateDetailData.bind(this, cell)}><button className="btn btn-fill btn-primary"> Details</button></a>;
    }
    setStateDetailData(cell, e) {
        this.setState(state => ({
            showDetail: true,
            detailData: cell
        }))
        e.preventDefault();
    }
    handleDetailCancel = () => {
        this.setState({
            showDetail: false,
            detailData: null,
            cancelDetail: true,
        })
    }

    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            hideSizePerPage: true,
        };

        let display = (
            <div className="content">
                <div className="container-fluid">
                    <div className="row ">
                        <BootstrapTable
                            data={this.props.data}
                            options={options}
                            fetchInfo={{ dataTotalSize: this.props.totalSize }}
                            remote
                            pagination
                            striped
                            hover
                            condensed
                        >
                            <TableHeaderColumn dataField="id" isKey dataAlign="center" width="10%">Id</TableHeaderColumn>
                            <TableHeaderColumn dataField="location" dataAlign="center" width="20%">Location</TableHeaderColumn>
                            <TableHeaderColumn dataField="note" dataAlign="center" width="20%">Note</TableHeaderColumn>
                            <TableHeaderColumn dataField="totalPrice" dataAlign="center" width="10%">Total Price</TableHeaderColumn>
                            <TableHeaderColumn dataField="staff" dataAlign="center" dataFormat={this.showStaffName} width="20%">Staff</TableHeaderColumn>
                            <TableHeaderColumn dataField="orderDetails" dataAlign="center" dataFormat={this.showDetail} width="10%">Detail</TableHeaderColumn>
                            <TableHeaderColumn dataField='status' dataAlign="center" dataFormat={this.showStatus} width="10%">Status</TableHeaderColumn>

                        </BootstrapTable>

                        <ReasonModal
                            show={this.state.showReason}
                            hide={() => this.handleReasonCancel()}
                            data={[this.props.reason]}
                            title="Reason"
                        />
                        <OrderDetailModal
                            show={this.state.showDetail}
                            hide={() => this.handleDetailCancel()}
                            data={this.state.detailData}
                            title="Detail"
                        />
                    </div>

                </div>
            </div>

        )
        if (this.props.loading) {
            display = <Spinner />
        }
        let errorMsg = null
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h4>Orders</h4>
                            </div>
                            {errorMsg}
                            <DateRangePicker 
                            startDateId="ord_start"
                            endDateId="ord_end"
                            onClose={(startDate, endDate) => {
                                this.setState({
                                    errorShow: true
                                })
                                this.changeDate(startDate, endDate)
                            }} 
                            />
                            {display}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        data: state.order.data,
        error: state.order.error,
        totalSize: state.order.total,
        page: state.order.page,
        sizePerPage: state.order.sizePerPage,
        reason: state.order.reason,
        startDate:state.order.startDate,
        endDate:state.order.endDate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, startDate, endDate) => dispatch(actions.getOrders(page, size, startDate, endDate)),
        onGetCancelReason: (orderId) => dispatch(actions.getCancelReason(orderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)