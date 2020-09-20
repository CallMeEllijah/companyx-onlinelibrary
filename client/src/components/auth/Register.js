import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Axios from "axios";

const studteachType = "1"; //always user typ1 for student and teacher
const managerType = "2"; //always user typ1 for manager
const admin = "3"; //always user typ1 for manager

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      lName: "",
      username: "",
      IDno: "",
      email: "",
      password: "",
      password2: "",
      secQ: "",
      secA: "",
      uType: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.username,
      IDno: this.state.IDno,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      secQ: this.state.secQ,
      secA: this.state.secA,
      uType: studteachType
    };

    this.props.registerUser(newUser, this.props.history);
    
    //edit the log to only run when they receive a success from register user

    var d = new Date();

    const newLog = {
      log: this.state.IDno + " has made a library account. at "  + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);

  };

  onSubmitAdmin = e => {
    e.preventDefault();

    const newUser = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.username,
      IDno: this.state.IDno,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      secQ: this.state.secQ,
      secA: this.state.secA,
      uType: managerType
    };

    this.props.registerUser(newUser, this.props.history);

    var d = new Date();

    const newLog = {
      log: "admin made " + this.state.IDno + " a manager account. at "  + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);

  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    if(user.uType !== "1" && user.uType !== "2" && user.uType !== "3"){ // if di ka admin or anonymous user ka, this method creates normal acc
      return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>

              <form noValidate onSubmit={this.onSubmit}>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.fName}
                    error={errors.fName}
                    id="fName"
                    type="text"
                    className={classnames("", {
                      invalid: errors.fName
                    })}
                  />
                  <label htmlFor="fName">First Name</label>
                  <span className="red-text">{errors.fName}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.lName}
                    error={errors.lName}
                    id="lName"
                    type="text"
                    className={classnames("", {
                      invalid: errors.lName
                    })}
                  />
                  <label htmlFor="lName">Last Name</label>
                  <span className="red-text">{errors.lName}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.username
                    })}
                  />
                  <label htmlFor="username">Username</label>
                  <span className="red-text">{errors.username}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.IDno}
                    error={errors.IDno}
                    id="IDno"
                    type="text"
                    className={classnames("", {
                      invalid: errors.IDno
                    })}
                  />
                  <label htmlFor="username">ID Number</label>
                  <span className="red-text">{errors.IDno}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div >
                <label>Security Question</label>
                  <select className="browser-default"
                      onChange={this.onChange}
                      value={this.state.secQ}
                      error={errors.secQ}
                      id="secQ">
                    <option value="" disabled selected>Choose your Security Question</option>
                    <option value="1">What is the name of your first pet?</option>
                    <option value="2">What is the Brand of your first car?</option>
                    <option value="3">What is the name of your favorite teacher?</option>
                  </select>
                  <span className="red-text">{errors.secQ}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.secA}
                    error={errors.secA}
                    id="secA"
                    type="text"
                    className={classnames("", {
                      invalid: errors.secA
                    })}
                  />
                  <label htmlFor="secA">Security Answer</label>
                  <span className="red-text">{errors.secA}</span>
                </div>

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      );
    } else if (user.uType === "3") {
      console.log("on admin register manager");
      return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
              </div>

              <form noValidate onSubmit={this.onSubmitAdmin}>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.fName}
                    error={errors.fName}
                    id="fName"
                    type="text"
                    className={classnames("", {
                      invalid: errors.fName
                    })}
                  />
                  <label htmlFor="fName">First Name</label>
                  <span className="red-text">{errors.fName}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.lName}
                    error={errors.lName}
                    id="lName"
                    type="text"
                    className={classnames("", {
                      invalid: errors.lName
                    })}
                  />
                  <label htmlFor="lName">Last Name</label>
                  <span className="red-text">{errors.lName}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.username
                    })}
                  />
                  <label htmlFor="username">Username</label>
                  <span className="red-text">{errors.username}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.IDno}
                    error={errors.IDno}
                    id="IDno"
                    type="text"
                    className={classnames("", {
                      invalid: errors.IDno
                    })}
                  />
                  <label htmlFor="username">ID Number</label>
                  <span className="red-text">{errors.IDno}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div >
                  <label>Security Question</label>
                  <select className="browser-default"
                      onChange={this.onChange}
                      value={this.state.secQ}
                      error={errors.secQ}
                      id="secQ">
                    <option value="" disabled selected>Choose your Security Question</option>
                    <option value="1">What is the name of your first pet?</option>
                    <option value="2">What is the Brand of your first car?</option>
                    <option value="3">What is the name of your favorite teacher?</option>
                  </select>
                  <span className="red-text">{errors.secQ}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.secA}
                    error={errors.secA}
                    id="secA"
                    type="text"
                    className={classnames("", {
                      invalid: errors.secA
                    })}
                  />
                  <label htmlFor="secA">Security Answer</label>
                  <span className="red-text">{errors.secA}</span>
                </div>

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      );
    }else {
      return(
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h1><b>Error</b></h1>
              <h4>
               Access to Page not Granted
              </h4>
              <Link to="/dashboard" className="btn-flat waves-effect">
                <i className="material-icons left">home</i> <b style={{color: "darkblue", textDecoration: "underline"}}>Click to go back to Home</b>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
