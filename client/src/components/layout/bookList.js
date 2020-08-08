import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MDBDataTableV5 } from 'mdbreact';
import Axios from "axios";


class bookList extends Component {
  constructor() {
    super();
    this.state = {
      data: [{
        column: [],
        row: []
      }],
      row: [],
      titles:[],
      errors: {}
    };
  }

 componentDidMount() {
    console.log(this.props.history.location.pathname);

    Axios
      .get("/api/books/getBooks")
      .then(res => {
        this.setState({
          row: res.data
        });
        console.log(res.data);
        console.log("this after setstate of row");
        console.log(this.state.row);

        for(var i = 0; i < this.state.row.length; i++){

          var temp = this.state.row[i].title;
          var temp1 = this.state.row[i].instances;
          if(temp.length > 20){
            temp = temp.substring(0, 45);
            temp = temp + '...';
          }

          if(temp1 == undefined){
            temp1 = 0;
          }

          this.state.titles.push({
            title: temp,
            link: 
            <div>
              <Link to={'/bookList/book/' + this.state.row[i].title} className="btn-flat waves-effect" style={{textDecoration: "underline", color:"blue"}}>
                Click Here
              </Link>
            </div>,
            bkAmt: temp1
          });
        }

        console.log(this.state.titles);

        this.setState({
          data: {
            columns: [
              {
                label: 'Title',
                field: 'title',
                width: '50px',
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'Title',
                },
              },
              {
                label: 'Details',
                field: 'link',
                width: '50px',
              },
              {
                label: 'Book Amount',
                field: 'bkAmt',
                width: '50px',
              }
            ],
            rows: this.state.titles
          }
        });

      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
        errors: err.response.data
        });
      });
}

  render() {
    if(this.props.auth.user.uType === "3"){
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

    if(parseInt(window.innerWidth) < 600){
      return(
        <div>
            <Link to="/" className="btn-flat waves-effect" style={{marginLeft: "100px"}}>
                <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
        <div style={{width: "auto", height: "100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <h2><b>Book List</b></h2>
          <MDBDataTableV5
          hover
          pages={false}
          data={this.state.data}
          paging={false}
          searchTop
          searchBottom={false}
          info={false}
          style={{maxWidth: "10px"}} />
        </div>
        </div>
      );
    }else {
      return(
        <div>
        <div style={{ height: "100%", width: "25%"}}>
            <Link to="/" className="btn-flat waves-effect" style={{marginLeft: "100px"}}>
                <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
        </div>
        <div style={{width: "auto", height: "100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <h2><b>Book List</b></h2>
          <MDBDataTableV5
          hover
          data={this.state.data}
          paging={false}
          searchTop
          searchBottom={false}
          info={false}
          style={{width: "600px"}}/>
        </div>
        </div>
      );
    }
  }
}

bookList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(bookList);

