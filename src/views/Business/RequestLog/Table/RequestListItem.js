import React, { Component } from "react";

export default class RequestListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.shop.SHOPNAME}</td>
        <td>{this.props.NUMBER}</td>
        <td>{this.props.USERNAME}</td>
        <td>{this.props.shop.ADDRESS}</td>
        <td onClick={() => this.props.showPhoto(this.props.URL)}>{this.props.URL}</td>
      </tr>
    );
  }
}
