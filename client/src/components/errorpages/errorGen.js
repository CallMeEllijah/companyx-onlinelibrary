import React, { Component } from "react";
import { Link } from "react-router-dom";

class error429 extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1><b>Generic Error</b></h1>
            <h4>
              Error has been encountered
            </h4>
            <Link to="/dashboard" className="btn-flat waves-effect">
                <i className="material-icons left">home</i> <b style={{color: "darkblue", textDecoration: "underline"}}>Click to go back to Home</b>
            </Link>
            </div>
        </div>
      </div>
    )
  }
}
export default error429;
