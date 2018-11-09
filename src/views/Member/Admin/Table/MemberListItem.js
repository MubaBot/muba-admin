import React, { Component } from "react";
import { Button } from "reactstrap";

import { AdminApi } from "api";

export default class MemberListItem extends Component {
  allowAdmin = () => {
    AdminApi.allowAdmin({ id: this.props._id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  blockAdmin = () => {
    AdminApi.blockAdmin({ id: this.props._id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>{this.props.ID}</td>
        <td>{this.props.USERNAME}</td>
        <td>{this.props.EMAIL}</td>
        <td>
          <Button onClick={this.props.BLOCK ? this.allowAdmin : this.blockAdmin} color={this.props.BLOCK ? "success" : "danger"}>
            {this.props.BLOCK ? "차단 해제" : "차단"}
          </Button>
        </td>
      </tr>
    );
  }
}
