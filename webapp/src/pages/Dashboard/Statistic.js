import React from 'react';
import { Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux'

class Statistic extends React.Component {
  render() {
      let display= <h3>No data to display</h3>
    if(this.props.lables && this.props.quantity){
        if(this.props.lables.length >1 && this.props.quantity.length>1){
        display =<Doughnut
        data={{
          labels: this.props.lables,
          datasets: [
            {
              label: 'Product',
              backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
              ],
              hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
              ],
              data: this.props.quantity
            }
          ]
        }}
        options={{
          title:{
            display:true,
            text:'Best seller in period',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    }}
    return (
        <div className="card">
      <div className="header">
        <h4 className="title">Product Statistics</h4>
      </div>
      <div className="content">

      <div>
        {display}
      </div>

      </div>
      <div className="footer">
       
        <hr />
        <div className="stats">
          <h2>Revenue: {this.props.revenue?this.props.revenue:0}</h2>
          </div>
      </div>
      </div>
    
    );
  }
}
const mapStateToProps = state => {
    return {
      quantity: state.statistic.quantity,
      lables:state.statistic.lables,
      revenue: state.statistic.revenue,
    }
  }
  

  
  export default connect(mapStateToProps)(Statistic)
