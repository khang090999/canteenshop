import React, {Component} from 'react';
import StaffProfileModal from "../Components/Modal/StaffProfileModal";
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class ProfileForm extends Component {
  state={
    updateFormShow:false,

  }
  handleUpdateCancel=()=>{
    this.setState({
      updateFormShow:false
    })
  }
  handleUpdateSubmit=values=>{
    this.props.onUpdateProfile(values)
  }
  render(){
    return(
  <div className="card">
    <div className="header">
      <h4 className="title">Staff Profile</h4>
    </div>
    <div className="content">
        <div className="row">
  
          <div className="col-md-5">
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" placeholder="Username" readOnly value={this.props.profile?this.props.profile.username:''}/>
            </div>
          </div>
          <div className="col-md-7">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Email" readOnly value={this.props.profile?this.props.profile.email:''}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="First Name" readOnly value={this.props.profile?this.props.profile.firstName:''}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Last Name" readOnly value={this.props.profile?this.props.profile.lastName:''}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Gender</label>
              <input type="text" className="form-control" placeholder="Gender" readOnly value={this.props.profile?this.props.profile.gender=='F'?'Female':'Male':''}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" placeholder="Home Address" readOnly value={this.props.profile?this.props.profile.address:''}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" className="form-control" placeholder="Phone" readOnly value={this.props.profile?this.props.profile.phone:''}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Date of birth</label>
              <input type="date" className="form-control" readOnly value={this.props.profile?this.props.profile.dob:''}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Hire Date</label>
              <input type="date" className="form-control" readOnly value={this.props.profile?this.props.profile.hireDate:''}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Social ID</label>
              <input type="text" className="form-control" placeholder="Social ID" readOnly value={this.props.profile?this.props.profile.socialId:''}/>
            </div>
          </div>
        </div>


        <button className="btn btn-info btn-fill pull-right" onClick={()=>this.setState({updateFormShow:true})}>Edit Profile</button>
        <div className="clearfix"></div>

      <StaffProfileModal
          show={this.state.updateFormShow}
          hide={() => this.handleUpdateCancel()}
          initialValues={this.props.profile}
          title="Edit Staff Profile"
          submitStaff={values => this.handleUpdateSubmit(values)}
        />
    </div>
  </div>
    )
  }
};
const mapDispatchToProps = dispatch => {
  return {
      onUpdateProfile: (values) => dispatch(actions.updateStaffProfile(values)),
  }
}
export default connect(null,mapDispatchToProps)(ProfileForm);