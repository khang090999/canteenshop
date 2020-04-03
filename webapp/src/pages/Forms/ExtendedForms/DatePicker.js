import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { isInclusivelyBeforeDay } from 'react-dates'
export default class DatePicker extends Component {
  state = {
    startDate: moment().subtract(1, 'months').startOf('month'),
    endDate: moment().startOf('month'),
    dateRangeFocusedInput: null,

  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 pull-right">
          <div className="form-group">
            <DateRangePicker
              startDate={this.state.startDate}
              startDateId={this.props.startDateId}
              endDate={this.state.endDate}
              endDateId={this.props.endDateId}
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              focusedInput={this.state.dateRangeFocusedInput}
              onFocusChange={focusedInput => {
                this.setState({dateRangeFocusedInput: focusedInput})
              }}
              onDatesChange={({startDate, endDate}) =>{ 
                this.setState({startDate, endDate})
                if (this.props.onDatesChange) {
                // this.props.onDatesChange(this.state.startDate,this.state.endDate)
                  this.props.onDatesChange(startDate,endDate)
                }
              }}
              onClose={({startDate, endDate}) =>{
                if (this.props.onClose) {
                  this.props.onClose(startDate,endDate)
                }
              }} 
              />
          </div>
        </div>
      </div>
    );
  }
}
