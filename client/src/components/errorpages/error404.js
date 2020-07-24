import React, { Component } from "react";
import { Link } from "react-router-dom";

class error404 extends Component {
  render() {
    console.log(this.props.history.location.pathname);
    var newpath = this.props.history.location.pathname.replace('/bookList/book/', '');
    console.log(newpath)
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1><b>404</b></h1>
            <h4>
              page not found
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
export default error404;
