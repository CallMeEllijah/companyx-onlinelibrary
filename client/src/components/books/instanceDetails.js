import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Axios from "axios";

class instanceDetails extends Component {

  constructor() {
        super();
        this.state = {
          _id: "",
          title: "",
          name: "",
          status: "",
          dateA: "",
          errors: {}
        };
      }

    componentDidMount() {
        const tite = {
          _id: this.props.history.location.pathname.replace('/bookList/instance/', '')
        }

        Axios.post("/api/books/getOneInstance", tite)
            .then(res => {
                this.setState({
                    _id: res.data._id,
                    title: res.data.title,
                    name: res.data.name,
                    status: res.data.status,
                    dateA: res.data.dateA
                });
                if(res.data.name === ""){
                    this.setState({
                        name: "No one is currently borrowing this book"
                    });
                }
                if(res.data.dateA === ""){
                    var d = new Date();
                    this.setState({
                        dateA: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
                    });
                }
                if(res.data.instance === "0"){
                    this.props.history.push("/404");
                }
            }).catch( err => {
                this.setState({
                    errors: err.response.data
                });
            })

    }

/* this will be for the fucking manager to edit*/
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

    Axios.post("/api/books/editOneInstance", this.state)
        .then(res => {
            this.props.history.goBack();
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response.data
            });
        });
    
    var d = new Date();

    const newLog = {
      log: this.state._id + " instance has been edited " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);
  };

  onSubmitRemoveInstance = e => {
    e.preventDefault();

    if(this.state.status === "borrowed"){
        alert("tamad ako so eto muna, cannot delete kasi nakahiram pa");
    } else {
        Axios.post("/api/books/deleteOneInstance", this.state)
        .then(res => {
            this.props.history.push("/successDeleteInstance");
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: err.response.data
            });
        });
        var d = new Date();

        const newLog = {
          log: this.state._id + " instance has been deleted " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
        };
    
        Axios.post("/api/logs/createLog", newLog);
    }

  };  

  onSubmitBorrowBook = e => {
    e.preventDefault();

    if(this.state.name !== "No one is currently borrowing this book") return alert("this is already borrowed pls wait when it is returned");

    const borrower = {
        _id: this.state._id,
        username: this.props.auth.user.username
    }

    Axios.post("/api/books/borrowInstance", borrower)
      .then(res => {
        this.props.history.goBack();
      })
      .catch(err => {
          console.log(err);
          this.setState({
              errors: err.response.data
          });
      });

      var d = new Date();

      const newLog = {
        log: this.state._id + " has been borrowed by " + this.props.auth.user.username + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
      };
  
      Axios.post("/api/logs/createLog", newLog);
  };

  render() {
    const { errors } = this.state;
    window.scrollTo(0,0);
    if(this.props.auth.user.uType === "2"){
        return(
            <div style={{ height: "125vh", display: "flex", alignItems: "start" }} className="container valign-wrapper row left-aligned">
                <div style={{ height: "100%", width: "25%"}}>
                  <Link to="/bookList" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back
                  </Link>
                </div>
             <div style={{ height: "auto" }} className="col">
                  <h3 className="flow-text"><b>{this.state._id}</b></h3>
                <div className="container valign-wrapper col left-aligned" style={{display: "flex", flexDirection: "column"}}>
                  <form className="col s12" noValidate onSubmit={this.onSubmit}>
                  <div className="col s12">
                          <b>Book Name</b>
                          <input disabled value={this.state.title} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Borrowed by</b>
                          <input disabled value={this.state.name} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Date Available</b>
                          <input disabled value={this.state.dateA} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="input-field col s12">
                        <b>Status</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.status}
                            error={errors.status}
                            id="status"
                            type="text"
                            className={classnames("", {
                              invalid: errors.status
                            })}/>
                        <span className="red-text">{errors.status}</span>
                      </div>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "100%",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }} 
                            type="submit" 
                            className="btn btn-medium waves-effect waves-light hoverable blue accent-3">
                            Edit Instance
                        </button>
                      </div>
                  </form>
                  <form className="col s12" noValidate onSubmit={this.onSubmitRemoveInstance}>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "100%",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }} 
                            type="submit" 
                            className="btn btn-medium waves-effect waves-light hoverable red accent-2">
                            Delete Instance
                        </button>
                      </div>
                  </form>
                <div>
              </div>
            </div>
          </div>
        </div>
          );
    } else if (this.props.auth.user.uType === undefined ){
        console.log("normal user/ anon user");
        return (
            <div style={{ height: "75vh", display: "flex", alignItems: "start" }} className="container valign-wrapper row left-aligned">
                <div style={{ height: "100%", width: "25%"}}>
                  <Link to="/" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back
                  </Link>
                </div>
              <div style={{ height: "auto" }} className="col">
                  <h3><b>{this.state._id}</b></h3>
                <div className="container valign-wrapper col left-aligned">
                  <form className="col s12" noValidate >
                      <div className="col s12">
                          <b>Title</b>
                          <input disabled value={this.state.title} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Borrowed by</b>
                          <input disabled value={this.state.name} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Date Available</b>
                          <input disabled value={this.state.dateA} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Status</b>
                          <input disabled value={this.state.status} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                  </form>
                </div>
              </div>
            </div>
          );
    } else if (this.props.auth.user.uType === "1"){
        console.log("normal user/ anon user");
        return (
            <div style={{ height: "75vh", display: "flex", alignItems: "start" }} className="container valign-wrapper row left-aligned">
                <div style={{ height: "100%", width: "25%"}}>
                  <Link to="/" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back
                  </Link>
                </div>
              <div style={{ height: "auto" }} className="col">
                  <h3><b>{this.state._id}</b></h3>
                <div className="container valign-wrapper col left-aligned"  style={{display: "flex", flexDirection: "column"}}>
                  <form className="col s12" noValidate >
                      <div className="col s12">
                          <b>Title</b>
                          <input disabled value={this.state.title} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Borrowed by</b>
                          <input disabled value={this.state.name} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Date Available</b>
                          <input disabled value={this.state.dateA} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Status</b>
                          <input disabled value={this.state.status} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                  </form>
                  <form className="col s12" noValidate onSubmit={this.onSubmitBorrowBook}>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "100%",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }} 
                            type="submit" 
                            className="btn btn-medium waves-effect waves-light hoverable blue accent-3">
                            Borrow Book
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

instanceDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(instanceDetails);
