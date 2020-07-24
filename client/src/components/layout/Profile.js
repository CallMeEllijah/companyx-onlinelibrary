import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { changePassword } from "../../actions/authActions";
import { MDBDataTableV5 } from 'mdbreact';
import Axios from 'axios';

var userEmail = "";

class Profile extends Component {

  constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          password2: "",
          //for reviews
          data3: [{
            row: [],
            column: []
          }],
          row3: [],
          instances3: [],
          //for books
          data4: [{
            row: [],
            column: []
          }],
          row4: [],
          instances4: [],
          errors: {}
        };
      }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/Landing");
    }

    const tite = {
      username: this.props.auth.user.username
    }
    //here; get reviews
    Axios
    .post("/api/books/getReviewsProfile", tite).then(res => {
      this.setState({
        row3: res.data
      });
      for(var j = 0; j < this.state.row3.length; j++){
        var tit = this.state.row3[j].title;
        var rev = this.state.row3[j].review;

        this.state.instances3.push({
          title: tit,
          review: <textarea disabled>{rev}</textarea>
        });
      }
      
      this.setState({
        data3: {
          columns: [
            {
              label: 'Title',
              field: 'title',
              width: '50px',
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'title',
              },
            },
            {
              label: 'Review',
              field: 'review',
              width: '50px',
            }
          ],
          rows: this.state.instances3
        }
      });
  })
  .catch(err => {
    var d = new Date();
      this.setState({
        data3: {
          columns: [
            {
              label: 'Status',
              field: 'Status',
              width: '50px'
            }
          ],
          rows: [{
            Status: "no reviews available as of " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
          }]
        }
      });
    });
  //here; get books borrowed
  Axios.post("/api/books/getBooksProfile", tite).then(res => {
    console.log(res);
  })
  Axios
  .post("/api/books/getBooksProfile", tite).then(res => {
    this.setState({
      row4: res.data
    });
    for(var j = 0; j < this.state.row4.length; j++){
      var _id = this.state.row4[j]._id;
      var tit = this.state.row4[j].title;

      this.state.instances4.push({
        _id: _id,
        title: tit
      });
    }
    console.log(this.state.instances4);
    this.setState({
      data4: {
        columns: [
          {
            label: 'UID',
            field: '_id',
            width: '50px',
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': '_id',
            },
          },
          {
            label: 'Title',
            field: 'title',
            width: '50px',
          }
        ],
        rows: this.state.instances4
      }
    });
})
.catch(err => {
  var d = new Date();
    this.setState({
      data4: {
        columns: [
          {
            label: 'Status',
            field: 'Status',
            width: '50px'
          }
        ],
        rows: [{
          Status: "no reviews available as of " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
        }]
      }
    });
  });
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
      email: userEmail,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.changePassword(newUser, this.props.history);
  };


  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    userEmail = user.email;

    if(user.uType === "1"){
      return (
        <div style={{ height: "75vh", display: "flex", alignItems: "start" }} className="container valign-wrapper row left-aligned">
            <div style={{ height: "100%", width: "25%"}}>
              <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back
              </Link>
            </div>

          <div style={{ height: "auto" }} className="col">
              <h1><b>Profile</b></h1>
            <div className="container valign-wrapper col left-aligned"   style={{display: "flex", flexDirection: "column", width:"88.88%"}}>
              <form className="col s12" noValidate onSubmit={this.onSubmit}>
                  <div className="col s12">
                      <b>Name</b>
                      <input disabled value={user.lName + ", " + user.fName} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>ID Number</b>
                      <input disabled value={user.IDno} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>Username</b>
                      <input disabled value={user.username} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>Email</b>
                      <input disabled value={user.email} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="input-field col s12">
                      <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password
                          })}/>
                      <label htmlFor="password">Old Password</label>
                      <span className="red-text">{errors.password || errors.passwordincorrect}</span>
                  </div>
                  <div className="input-field col s12">
                      <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          id="password2"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password2
                          })}/>
                          <label htmlFor="password2">New Password</label>
                          <span className="red-text">{errors.password2 || errors.samepassword}</span>
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
                      Change Password
                      </button>
                  </div>
              </form>
              <h3><b>Review List</b></h3>
                  <MDBDataTableV5
                    hover
                    info={false}
                    data={this.state.data3}
                    paging={false}
                    searching={false}
                    style={{width: "600px"}}/>
              <h3><b>Book/s Currently Borrowed</b></h3>
                  <MDBDataTableV5
                    hover
                    info={false}
                    data={this.state.data4}
                    paging={false}
                    searching={false}
                    style={{width: "600px"}}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper row left-aligned">
            <div style={{ height: "100%", width: "25%"}}>
              <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back
              </Link>
            </div>

          <div style={{ height: "auto" }} className="col">
              <h1><b>Profile</b></h1>
            <div className="container valign-wrapper col left-aligned">
              <form className="col s12" noValidate onSubmit={this.onSubmit}>
                  <div className="col s12">
                      <b>Name</b>
                      <input disabled value={user.lName + ", " + user.fName} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>ID Number</b>
                      <input disabled value={user.IDno} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>Username</b>
                      <input disabled value={user.username} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="col s12">
                      <b>Email</b>
                      <input disabled value={user.email} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                  </div>
                  <div className="input-field col s12">
                      <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password
                          })}/>
                      <label htmlFor="password">Old Password</label>
                      <span className="red-text">{errors.password || errors.passwordincorrect}</span>
                  </div>
                  <div className="input-field col s12">
                      <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          id="password2"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password2
                          })}/>
                          <label htmlFor="password2">New Password</label>
                          <span className="red-text">{errors.password2 || errors.samepassword}</span>
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
                      Change Password
                      </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

Profile.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(Profile);
