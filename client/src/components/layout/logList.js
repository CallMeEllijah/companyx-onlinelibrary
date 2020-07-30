import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MDBDataTableV5 } from 'mdbreact';
import Axios from "axios";


class logList extends Component {
  constructor() {
    super();
    this.state = {
      data: [{
        column: [],
        row: []
      }],
      row: [],
      logs:[],
      errors: {}
    };
  }

 componentDidMount() {
    console.log(this.props.history.location.pathname);

    Axios
      .get("/api/logs/getLogs")
      .then(res => {
        this.setState({
          row: res.data
        });

        for(var i = 0; i < this.state.row.length; i++){

          var temp = this.state.row[i].log;

          this.state.logs.push({
            log: temp
          });
        }

        console.log(this.state.logs);

        this.setState({
          data: {
            columns: [
              {
                label: 'System Logs',
                field: 'log',
                width: '50px',
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'Log',
                }
              }
            ],
            rows: this.state.logs
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
    if(parseInt(window.innerWidth) < 600){
      return(
        <div>
            <Link to="/" className="btn-flat waves-effect" style={{marginLeft: "100px"}}>
                <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
        <div style={{width: "auto", height: "100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <h2><b>Logs</b></h2>
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
          <h2><b>Logs</b></h2>
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

logList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(logList);

