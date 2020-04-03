import React, { Component } from 'react'
class ImageButton extends Component {
   upload = () => {
      document.getElementById("selectImage").click()
   }
   render() {
      return (
         <button onClick={()=>{
            this.props.clicked()
            this.upload()
            }} type="button" rel="tooltip" data-placement="left" title="" className="btn btn-info btn-simple btn-icon" data-original-title="View Post" >
            <i className="fa fa-image"></i>
            <input onChange={this.props.fileSelect} accept="image/*" id="selectImage" type="file" style={{ display: 'none' }} />
         </button>
      )
   }
}

export default ImageButton