import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../redux/actioncreator";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
