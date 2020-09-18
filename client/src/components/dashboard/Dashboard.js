import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { MDBDataTableV5 } from 'mdbreact';
import Axios from 'axios';

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
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
      var date = this.state.row4[j].dateA;
      var tit = this.state.row4[j].title;

      this.state.instances4.push({
        dateA: date,
        title: tit
      });
    }
    console.log(this.state.instances4);
    this.setState({
      data4: {
        columns: [
          {
          label: 'Title',
          field: 'title',
          width: '50px',
          },
          {
            label: 'Due Date',
            field: 'dateA',
            width: '50px',
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'dueDate',
            },
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
          Status: "no currently borrowed books as of " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
        }]
      }
    });
  });
  }

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
        <div style={{ height: "125vh", display: "flex", alignItems: "start", justifyContent:"center" }} className="container valign-wrapper">
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b style={{fontSize: "50px"}}>Hey there, {user.fName}</b>
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
                className="btn btn-large waves-effect waves-light hoverable teal accent-4">
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
                className="btn btn-large waves-effect waves-light hoverable red accent-2">
                Logout
              </button>
              <h4><b>Books Currently Borrowed</b></h4>
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
    } else if (user.uType === "2"){// render for managers
      return (
        <div style={{ height: "125vh", display: "flex", alignItems: "start", justifyContent:"center" }} className="container valign-wrapper">
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
                className="btn btn-large waves-effect waves-light hoverable teal accent-4">
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
                className="btn btn-large waves-effect waves-light hoverable red accent-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else if (user.uType === "3"){ //render for admins
      return (
        <div style={{ height: "125vh", display: "flex", alignItems: "start", justifyContent:"center" }} className="container valign-wrapper">
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
                className="btn btn-large waves-effect waves-light hoverable teal accent-4">
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
                className="btn btn-large waves-effect waves-light hoverable red accent-2">
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
