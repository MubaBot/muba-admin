import React, { Component } from "react";
import { Button } from "reactstrap";

export default class RequestListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.shop.SHOPNAME}</td>
        <td>{this.props.NUMBER}</td>
        <td>{this.props.USERNAME}</td>
        <td>{this.props.shop.ADDRESS}</td>
        <td onClick={() => this.props.showPhoto(this.props.URL)}>{this.props.URL}</td>
        <td onClick={() => this.props.admissionRequest(this.props._id)}>
          <Button color="success">승인</Button>
        </td>
      </tr>
    );
  }
}
