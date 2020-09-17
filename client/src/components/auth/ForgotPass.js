import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Axios from "axios";

const studteachType = "1"; //always user typ1 for student and teacher
const managerType = "2"; //always user typ1 for manager
const admin = "3"; //always user typ1 for manager

class ForgotPass extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      secQ: "",
      secA: "",
      password: "",
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

  onBlurEmail = e => {
    e.preventDefault();

    const emailuser = {
        email: this.state.email,
        secQ: this.state.secQ,
        secA: this.state.secA,
        password: this.state.password
      };

    Axios.post("/api/users/findUser", emailuser)
    .then(res => {
        if(res.data.question == 1){
            this.setState({ secQ: "What is the name of your first pet?" });
        }else if(res.data.question == 2){
            this.setState({ secQ: "What is the Brand of your first car?" });
        }else if(res.data.question == 3){
            this.setState({ secQ: "What is the name of your favorite teacher?" });
        }
    })
    .catch(this.setState({ secQ: "Email Not Found" }) );
    
  };

  onSubmit = e => {
    e.preventDefault();

    const UserChangePass = {
      email: this.state.email,
      secA: this.state.secA,
      password: this.state.password
    };

    Axios.post("/api/users/changeForgotPassword", UserChangePass)
    .then(res => this.props.history.push("/"))
    .catch((err) =>{
        console.log(err.response.data);
        this.setState({
            errors: err.response.data
        });
    });

  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    if(user.uType !== "1" && user.uType !== "2" && user.uType !== "3"){
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
                  <b>Forgot Password</b>
                </h4>
              </div>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onBlur={this.onBlurEmail}
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="fName">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>

                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.secQ}
                    error={errors.secQ}
                    id="secQ"
                    type="text"
                    className={classnames("", {
                      invalid: errors.secQ
                    })}
                    readOnly
                  />
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
                  <label htmlFor="password">New Password</label>
                  <span className="red-text">{errors.password}</span>
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
                    Reset Password
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      );
    } else {
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

ForgotPass.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(ForgotPass);
