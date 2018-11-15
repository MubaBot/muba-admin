import React, { Component } from "react";
import { Button } from "reactstrap";

import { UserApi } from "api";

export default class MemberListItem extends Component {
  allowUser = () => {
    UserApi.allowUser({ id: this.props._id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  blockUser = () => {
    UserApi.blockUser({ id: this.props._id })
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
          <Button onClick={this.props.BLOCK ? this.allowUser : this.blockUser} color={this.props.BLOCK ? "success" : "danger"}>
            {this.props.BLOCK ? "차단 해제" : "차단"}
          </Button>
        </td>
      </tr>
    );
  }
}
