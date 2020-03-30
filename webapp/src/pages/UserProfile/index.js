import React, {Component}  from 'react';
import ProfileForm from './ProfileForm';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

class UserProfile extends Component{
  componentDidMount(){
    this.props.onFetchData(localStorage.getItem('username'))
  }
  state={
    addFormShow:false
  }
  render(){
     let display=<Spinner/>
     if(this.props.updateSuccess){
      this.props.onFetchData(localStorage.getItem('username'))

     }
     if(!this.props.loading){
      
       display=(
         
       <ProfileForm profile={this.props.data}/>
     
        )
     } 
    return(
      <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
          {display}

          </div>
        </div>
      </div>
    </div>
    )
  }
 
}
const mapStateToProps = state => {
  return {
      loading: state.staff_profile.loading,
      data: state.staff_profile.data,
      error: state.staff_profile.error,
      updateSuccess: state.staff_profile.updateSuccess,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchData: (username) => dispatch(actions.getStaffProfile(username)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);