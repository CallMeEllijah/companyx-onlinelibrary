import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  onRegisterClick = e => {
    e.preventDefault();
    this.props.history.push("/Register");
  };

  onProfileClick = e => {
    e.preventDefault();
    this.props.history.push("/Profile");
  };
  
  onBookListClick = e => {
    e.preventDefault();
    this.props.history.push("/bookList");
  };

  onAddBookClick = e => {
    e.preventDefault();
    this.props.history.push("/createBook");
  };

  onLogClick = e => {
    e.preventDefault();
    this.props.history.push("/logList");
  };

  render() {
    const { user } = this.props.auth;
    if(user.uType === "1"){ //if user is a student or teacher lod this
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b style={{fontSize: "50px"}}>Hey there, <p style={{color: "green"}}>{user.fName}</p></b>
                <p className="flow-text grey-text text-darken-1">
                  Welcome to your dashboard
                </p>
              </h4>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onProfileClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Profile
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onBookListClick}
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3">
                Existing Books
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else if (user.uType === "2"){// render for managers
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b style={{fontSize: "50px"}}>Hey there, <p style={{color: "green"}}>{user.fName}</p></b>
                <p className="flow-text grey-text text-darken-1">
                  Welcome to your dashboard
                </p>
              </h4>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onProfileClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Profile
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onBookListClick}
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3">
                Existing Books
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onAddBookClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Add Book
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else if (user.uType === "3"){ //render for admins
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b style={{fontSize: "50px"}}>Hey there, <p style={{color: "green"}}>{user.fName}</p></b>
                <p className="flow-text grey-text text-darken-1">
                  Welcome to your dashboard
                </p>
              </h4>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onProfileClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Profile
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onRegisterClick}
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3">
                Register Manager
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                View System Logs
              </button>
              <br></br>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
