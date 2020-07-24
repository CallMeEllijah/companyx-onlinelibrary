import React, { Component } from "react";
import { Link } from "react-router-dom";

class successBookCreate extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1><b>Success!</b></h1>
            <h4>
              book was added to the database
            </h4>
            <Link to="/dashboard" className="btn-flat waves-effect">
                <i className="material-icons left">dashboard</i> <b style={{color: "darkblue", textDecoration: "underline"}}>Click to go back to DashBoard</b>
            </Link>

            </div>
        </div>
      </div>
    )
  }
}
export default successBookCreate;
