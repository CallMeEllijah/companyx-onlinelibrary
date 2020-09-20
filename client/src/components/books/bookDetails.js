import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Axios from "axios";
import { MDBDataTableV5 } from 'mdbreact';

class bookDetails extends Component {

  constructor() {
        super();
        this.state = {
          oldTitle: "",
          title: "",
          authors: "",
          year: "",
          isbn: "",
          callno: "",
          //here liez my ded body jk nandito yung ano yung basta dito ko lalagay instances
          data: [{
            column: [],
            row: []
          }],
          row: [],
          instances:[],
          //dito naman lalagay ko mga mama mo jk reviews
          review: "",
          data2: [{
            column: [],
            row: []
          }],
          row2: [],
          instances2:[],

          _id: "",

          errors: {}
        };
      }

      componentDidMount() {
        const tite = {
          oldTitle: this.props.history.location.pathname.replace('/bookList/book/', '')
        }

        Axios.post("/api/books/bookDetails", {title: this.props.history.location.pathname.replace('/bookList/book/', '')})
        .then(res => {
            this.setState({
                oldTitle: res.data.title,
                title: res.data.title,
                authors: res.data.authors,
                year: res.data.year,
                isbn: res.data.isbn,
                callno: res.data.callno
            });
            console.log("poop");
            console.log(res);
        })
        .catch( err => {
            this.setState({
            errors: err.response.data
            });
            if(err.response.data.bookListData === "book doesnt exist") this.props.history.push("/404");
        });
        

        Axios.post("/api/books/getInstance", tite)
        .then(res => {
          this.setState({
            row: res.data
          });

          for(var i = 0; i < this.state.row.length; i++){
            console.log(this.state.row[i]);
            var temp = i+1;
            if(this.state.row[i].status == "borrowed"){ 
              var temp2 = <p style={{color:"red"}}>{this.state.row[i].status}</p>
              var temp3 = 
              <form onSubmit={this.onSubmitBorrowInstance}>
              <div style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }} 
                  onClick={this.onclickvalue}
                  type="submit"
                  value={this.state.row[i]._id}
                  className="btn btn-medium waves-effect waves-light hoverable grey accent-3 disabled">
                    Borrow
                  </button>
                </div>
              </form>
            }
            if(this.state.row[i].status == "available"){
              var temp2 = <p style={{color:"green"}}>{this.state.row[i].status}</p>
              var temp3 = 
                <form onSubmit={this.onSubmitBorrowInstance}>
                  <div style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                      }} 
                      onClick={this.onclickvalue}
                      type="submit"
                      value={this.state.row[i]._id}
                      className="btn btn-medium waves-effect waves-light hoverable blue accent-3">
                        Borrow
                      </button>
                    </div>
                </form>
          }
            if(temp.length > 25){
              temp = temp.substring(0, 45);
              temp = temp + '...';
            }
            if(this.props.auth.user.uType == 1){
              this.state.instances.push({
                UID: temp,
                status: temp2,
                link: temp3
              });
            } else if(this.props.auth.user.uType == 2){
              this.state.instances.push({
                UID: temp,
                status: temp2,
                link: <div>
                <Link to={'/bookList/instance/' + this.state.row[i]._id} className="btn-flat waves-effect" style={{textDecoration:"underline", color:"blue"}}>
                  Click to edit instance details
                </Link>
              </div>
              });
            } else {
              this.state.instances.push({
                UID: temp,
                status: temp2
              });
            }
          }

          if(this.props.auth.user.uType != undefined)
          this.setState({
            data: {
              columns: [
                {
                  label: 'Instance',
                  field: 'UID',
                  width: '50px',
                  attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'UID',
                  },
                },
                {
                  label: 'Status',
                  field: 'status',
                  width: '50px',
                },
                {
                  label: 'Link/s',
                  field: 'link',
                  width: '50px',
                }
              ],
              rows: this.state.instances
            }
          });
          else
          this.setState({
            data: {
              columns: [
                {
                  label: 'Instance',
                  field: 'UID',
                  width: '50px',
                  attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'UID',
                  },
                },
                {
                  label: 'Status',
                  field: 'status',
                  width: '50px',
                }
              ],
              rows: this.state.instances
            }
          });
      })
      .catch(err => {
        var d = new Date();
        console.log(err.response.data);
          this.setState({
            data: {
              columns: [
                {
                  label: 'Status',
                  field: 'Status',
                  width: '50px'
                }
              ],
              rows: [{
                Status: "no books available as of " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
              }]
            }
          });
        });
        //here; get reviews
        console.log("start here get review")
        Axios
        .post("/api/books/getReviews", tite).then(res => {
          this.setState({
            row2: res.data
          });

          for(var j = 0; j < this.state.row2.length; j++){
            var use = this.state.row2[j].username;
            var rev = this.state.row2[j].review;

            this.state.instances2.push({
              username: use,
              review: <textarea disabled>{rev}</textarea>
            });
          }
          console.log("unique")
          console.log(this.state.instances2)

          this.setState({
            data2: {
              columns: [
                {
                  label: 'Username',
                  field: 'username',
                  width: '50px',
                  attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'username',
                  },
                },
                {
                  label: 'Review',
                  field: 'review',
                  width: '50px',
                }
              ],
              rows: this.state.instances2
            }
          });
      })
      .catch(err => {
        var d = new Date();
        console.log(err.response.data);
          this.setState({
            data2: {
              columns: [
                {
                  label: 'Reviews',
                  field: 'review',
                  width: '50px'
                }
              ],
              rows: [{
                review: "no reviews available as of " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
              }]
            }
          });
        });
  }

/* this will be for the manager to edit*/
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
    //first edits the bookinstances that it may have (if nag change ng name yung book)
    Axios
        .post("/api/books/bookEditInstanceUpdate", this.state)
        .then(res => console.log("ok na instances update"))
        .catch((err) =>{
            console.log(err.response.data);
            this.setState({
                errors: err.response.data
            });
        }
        );
    //second edits the book itself 
    Axios
    .post("/api/books/bookEdit", this.state)
    .then(res => this.props.history.push("/successBookEdit"))
    .catch((err) =>{
        console.log(err.response.data);
        this.setState({
            errors: err.response.data
        });
    }
    );
    var d = new Date();

    const newLog = {
      log: this.state.oldTitle + " book has been edited by "  +  this.props.auth.user.username + " at " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);
  };

  //change the instance val clicked right now
  onclickvalue = e => {
    this.setState({_id: e.target.value});
  }

  onSubmitBorrowInstance = e => {
    e.preventDefault();
    
    const borrower = {
        _id: this.state._id,
        username: this.props.auth.user.username
    }

    Axios.post("/api/books/borrowInstance", borrower)
      .then(res => {
        this.props.history.push("/successBookBorrow");
      })
      .catch(err => {
          console.log(err);
          this.setState({
              errors: err.response.data
          });
      });

      var d = new Date();

      const newLog = {
        log: this.state._id + " has been borrowed by " + this.props.auth.user.username + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
      };
  
      Axios.post("/api/logs/createLog", newLog);
  };

  onSubmitAddInstance = e => {
    e.preventDefault();

    const newInstance = {
        title: this.state.oldTitle,
        name: "",
        status: "available",
        dateA: ""
    };

    Axios
    .post("/api/books/addInstance", newInstance)
    .then(res => this.props.history.push("/successAddInstance"))
    .catch((err) => this.props.history.push("/errorGen"));

    var d = new Date();

    const newLog = {
      log: this.state.oldTitle + " instance has been added to the library by "  +  this.props.auth.user.username + " at " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);
  };

  onSubmitDeleteBook = e => {
    e.preventDefault();

    const newInstance = {
        title: this.state.oldTitle
    };
    if(!this.state.instances.length){
      console.log("pwede delete");
      Axios
      .post("/api/books/deleteBook", newInstance)
      .then(res => this.props.history.push("/successBookDelete"))
      .catch((err) => this.props.history.push("/errorGen"));

      var d = new Date();

      const newLog = {
        log: this.state.oldTitle + " book has been deleted by " +  this.props.auth.user.username + " at " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
      };
  
      Axios.post("/api/logs/createLog", newLog);
    } else {
      console.log("bawal delete");
      this.props.history.push("/errorBookDelete");
    }
  };

  //adding review
  onSubmitAddReview = e => {
    e.preventDefault();

    const newReview = {
        username: this.props.auth.user.username,
        title: this.state.oldTitle,
        review: this.state.review
    };

    Axios
    .post("/api/books/createReview", newReview)
    .then(res => this.props.history.push("/successAddReview"))
    .catch((err) => {this.setState({
        errors: err.response.data
      })
      console.log(err.response.data);
  });

    var d = new Date();

    const newLog = {
      log: this.state.oldTitle + " has received a review from " + this.props.auth.user.username + " " + (d.getMonth() + 1)+ "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    Axios.post("/api/logs/createLog", newLog);
  };

  render() {
    const { errors } = this.state;

    if(this.props.auth.user.uType === "2"){
        return(
            <div style={{ height: "125vh", display: "flex", alignItems: "start", justifyContent:"center" }} className="container valign-wrapper row left-aligned">
                <div style={{ height: "100%", width: "25%"}}>
                  <Link to="/bookList" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back
                  </Link>
                </div>
             <div style={{ height: "auto"}} className="col">
                <div className="container valign-wrapper col left-aligned" style={{display: "flex", width:"88.88%", flexDirection: "column"}}> 
                  <h3><b>{this.state.oldTitle}</b></h3>
                  <form className="col s12" noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <b>Title</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.title}
                            error={errors.title}
                            id="title"
                            type="text"
                            className={classnames("", {
                              invalid: errors.title
                            })}/>
                        <span className="red-text">{errors.title}</span>
                    </div>
                    <div className="input-field col s12">
                        <b>Author/s</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.authors}
                            error={errors.authors}
                            id="authors"
                            type="text"
                            className={classnames("", {
                              invalid: errors.authors
                            })}/>
                        <span className="red-text">{errors.authors}</span>
                    </div>
                    <div className="input-field col s12">
                        <b>Year of Publication</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.year}
                            error={errors.year}
                            id="year"
                            type="text"
                            className={classnames("", {
                              invalid: errors.year
                            })}/>
                        <span className="red-text">{errors.year}</span>
                    </div>
                    <div className="input-field col s12">
                        <b>ISBN</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.isbn}
                            error={errors.isbn}
                            id="isbn"
                            type="text"
                            className={classnames("", {
                              invalid: errors.isbn
                            })}/>
                        <span className="red-text">{errors.isbn}</span>
                    </div>
                    <div className="input-field col s12">
                        <b>Call Number</b>
                        <input style={{borderBottomColor: "lightblue", borderBottomStyle: "solid"}} 
                            onChange={this.onChange}
                            value={this.state.callno}
                            error={errors.callno}
                            id="callno"
                            type="text"
                            className={classnames("", {
                              invalid: errors.callno
                            })}/>
                        <span className="red-text">{errors.callno}</span>
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
                            Edit Book Details
                        </button>
                    </div>
                  </form>
                  <form className="col s12" noValidate onSubmit={this.onSubmitDeleteBook}>
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
                            Delete Book
                        </button>
                      </div>
                  </form>
                  <form className="col s12" noValidate onSubmit={this.onSubmitAddInstance}>
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
                            Add Instance
                        </button>
                      </div>
                  </form>
                  
                  <div style={{width: "auto", height: "auto", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop: "50px"}}>
                    <h3><b>Available Book List</b></h3>
                    <MDBDataTableV5
                    hover
                    info={false}
                    data={this.state.data}
                    paging={false}
                    searchTop
                    searchBottom={false}
                    style={{width: "600px"}}/>
                  </div>
                  
                <div>
              </div>
            </div>
          </div>
        </div>
          );
    } else if (this.props.auth.user.uType === "1"){
        return (
            <div style={{ height: "75vh", display: "flex", alignItems: "start"}} className="container valign-wrapper row left-aligned">
                <div style={{ height: "100%"}}>
                  <Link to="/bookList" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back
                  </Link>
                </div>
              <div style={{ height: "auto"}}className="col">
                <div className="container valign-wrapper col left-aligned" style={{display: "flex", flexDirection: "column", width:"88.88%"}}>
                  <h3><b>{this.state.title}</b></h3>
                  <form className="col s12" noValidate>
                      <div className="col s12">
                          <b>Author/s</b>
                          <input disabled value={this.state.authors} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Year of Publication</b>
                          <input disabled value={this.state.year} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>ISBN</b>
                          <input disabled value={this.state.isbn} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                      <div className="col s12">
                          <b>Call Number</b>
                          <input disabled value={this.state.callno} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                      </div>
                  </form>
                  <div style={{width: "auto", height: "auto", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop: "50px"}}>
                    <h3><b>Available Book List</b></h3>
                    <MDBDataTableV5
                    hover
                    info={false}
                    data={this.state.data}
                    paging={false}
                    searchBottom={false}
                    style={{width: "600px"}}/>
                  </div>
                  <h3><b>Reviews</b></h3>
                  <form class="col s12" onSubmit={this.onSubmitAddReview}>
                    <div class="input-field col s12">
                      <textarea 
                            onChange={this.onChange}
                            value={this.state.review}
                            error={errors.review}
                            id="review"
                            type="text"
                            className={classnames("", {
                              invalid: errors.review
                            })}/>
                      <span className="red-text">{errors.review}</span>
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
                      Add Review
                      </button>
                    </div>
                  </form>
                  <br/><br/><br/>
                  <h3><b>Review List</b></h3>
                  <MDBDataTableV5
                    hover
                    info={false}
                    data={this.state.data2}
                    paging={false}
                    searching={false}
                    style={{width: "600px"}}/>
                </div>
              </div>
            </div>
          );
    } else if (this.props.auth.user.uType === undefined ){
      return (
          <div style={{ height: "75vh", display: "flex", alignItems: "start"}} className="container valign-wrapper row left-aligned">
              <div style={{ height: "100%", width: "25%"}}>
                <Link to="/bookList" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back
                </Link>
              </div>
            <div style={{ height: "auto"}}className="col">
              <div className="container valign-wrapper col left-aligned" style={{display: "flex", flexDirection: "column", width:"88.88%"}}>
                <h3><b>{this.state.title}</b></h3>
                <form className="col s12" noValidate>
                    <div className="col s12">
                        <b>Author/s</b>
                        <input disabled value={this.state.authors} id="disabled" type="text" style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                    </div>
                    <div className="col s12">
                        <b>Year of Publication</b>
                        <input disabled value={this.state.year} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                    </div>
                    <div className="col s12">
                        <b>ISBN</b>
                        <input disabled value={this.state.isbn} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                    </div>
                    <div className="col s12">
                        <b>Call Number</b>
                        <input disabled value={this.state.callno} id="disabled" type="text"style={{color: "black", fontStyle: "bold", borderBottomColor: "black", borderBottomStyle: "solid"}} />
                    </div>
                </form>
                <div style={{width: "auto", height: "auto", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop: "50px"}}>
                  <h3><b>Available Book List</b></h3>
                  <MDBDataTableV5
                  hover
                  info={false}
                  data={this.state.data}
                  paging={false}
                  searchBottom={false}
                  style={{width: "600px"}}/>
                </div>
                <h3><b>Review List</b></h3>
                <MDBDataTableV5
                  hover
                  info={false}
                  data={this.state.data2}
                  paging={false}
                  searching={false}
                  style={{width: "600px"}}/>
              </div>
            </div>
          </div>
        );
  } else {
        return(
            <div style={{ height: "75vh"}} className="container valign-wrapper">
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

bookDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(bookDetails);
