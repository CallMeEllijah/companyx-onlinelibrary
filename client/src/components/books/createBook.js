import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";

class createBook extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      authors: "",
      year: "",
      isbn: "",
      callno: "",
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

    const newBook = {
      title: this.state.title,
      authors: this.state.authors,
      year: this.state.year,
      isbn: this.state.isbn,
      callno: this.state.callno
    };

    //'ere lies the adding to db
    axios
        .post("/api/books/createBook", newBook)
        .then(res => this.props.history.push("/successBookCreate"))
        .catch((err) =>{
            console.log(err.response.data);
            this.setState({
                errors: err.response.data
            });
        }
        );

    var d = new Date();

    const newLog = {
      log: this.state.title + " book has been added to the library by" + this.props.auth.user.username + " at " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes()
    };

    axios.post("/api/logs/createLog", newLog);
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    
    if(user.uType !== "2"){
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
    } else {
        return(
            <div className="container">
                <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Create Book</b>
                    </h4>
                    </div>
    
                    <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12"> {/*title*/}
                        <input
                        onChange={this.onChange}
                        value={this.state.title}
                        error={errors.title}
                        id="title"
                        type="text"
                        className={classnames("", {
                            invalid: errors.title
                        })}
                        />
                        <label htmlFor="title">Title</label>
                        <span className="red-text">{errors.title}</span>
                    </div>
    
                    <div className="input-field col s12">{/* authors */}
                        <input
                        onChange={this.onChange}
                        value={this.state.authors}
                        error={errors.authors}
                        id="authors"
                        type="text"
                        className={classnames("", {
                            invalid: errors.authors
                        })}
                        />
                        <label htmlFor="authors">Author/s</label>
                        <span className="red-text">{errors.authors}</span>
                    </div>
    
                    <div className="input-field col s12"> {/*year*/}
                        <input
                        onChange={this.onChange}
                        value={this.state.year}
                        error={errors.year}
                        id="year"
                        type="number"
                        className={classnames("", {
                            invalid: errors.year
                        })}
                        />
                        <label htmlFor="year">Year of Publication</label>
                        <span className="red-text">{errors.year}</span>
                    </div>
    
                    <div className="input-field col s12"> {/*isbn*/}
                        <input
                        onChange={this.onChange}
                        value={this.state.isbn}
                        error={errors.isbn}
                        id="isbn"
                        type="number"
                        className={classnames("", {
                            invalid: errors.isbn
                        })}
                        />
                        <label htmlFor="isbn">ISBN</label>
                        <span className="red-text">{errors.isbn}</span>
                    </div>
    
                    <div className="input-field col s12"> {/*callno*/}
                        <input
                        onChange={this.onChange}
                        value={this.state.callno}
                        error={errors.callno}
                        id="callno"
                        type="text"
                        className={classnames("", {
                            invalid: errors.callno
                        })}
                        />
                        <label htmlFor="callno">Call number</label>
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
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Create Book
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

createBook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(withRouter(createBook));
