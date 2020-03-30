import React, { Component } from 'react';
import Statistic from './Statistic';
import DateRangePicker from '../Forms/ExtendedForms/DatePicker'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/Spinner/Spinner'
import moment from 'moment';
import {  Alert } from 'react-bootstrap'

class Dashboard extends Component {
  state={
    errorShow:true
  }
  changeDate(startDate= moment().subtract(1, 'months').startOf('month'), endDate=moment().startOf('month')) {
    this.props.onGetStatistic(this.formatDate(new Date(startDate)), this.formatDate(new Date(endDate)))
  }
  formatDate(date) {
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var month = (monthIndex + 1) < 10 ? '0' + (monthIndex + 1) : (monthIndex + 1)
    return (year + "-" + month + "-" + day)
  }
  componentDidMount(){
    this.changeDate()
  }
  render() {
    let display =<Statistic  />
    if (this.props.loading ) {
      display = <Spinner />
  }
  let error=null
  if(this.props.error && this.state.errorShow){
    error = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
  }

    return (
      <div className="content">
        <div className="container-fluid">
          {error}
          <DateRangePicker onClose={(startDate, endDate) => {
            this.setState({errorShow:true})
            this.changeDate(startDate, endDate)}} 
            startDateId="stat_start"
            endDateId="stat_end"/>

          <div className="row ">
            <div className="col-md-6 col-md-offset-3 col-lg-offset-3">
              {display}
            </div>
          </div>


        </div>
      </div>
    )
  }

};
const mapStateToProps = state => {
  return {
    loading: state.statistic.loading,
    error: state.statistic.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetStatistic: (startDate, endDate) => dispatch(actions.getStatistic(startDate, endDate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
