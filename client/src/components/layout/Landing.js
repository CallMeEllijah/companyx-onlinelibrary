import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {

  componentDidMount() {
    
    console.log(this.props.history.location.pathname);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
      console.log("this should work amiririrrite");
    }

    //resets login attempts
    this.props.auth.attempts = 0;
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
              <b>Company X :</b> an online library platform
            </h3>
            <br/>
            <p className="flow-text grey-text text-darken-1">
              <b>Anonymous User:</b> Browse and search books
            </p>
            <p className="flow-text grey-text text-darken-1">
            <b>Student/Teacher:</b> Browse and search books, Borrow books
            </p>

            <br/><br/>

            <div className="col s4">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Register
              </Link>
            </div>

            <div className="col s4">
              <Link
                to="/bookList"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable teal accent-4">
                Books
              </Link>
            </div>

            <div className="col s4">  
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Log In
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(Landing);
