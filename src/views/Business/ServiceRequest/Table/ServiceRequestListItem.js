import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";

import accounting from "accounting-js";
import moment from "moment";
import "moment/locale/ko";

import { BusinessApi } from "api";

export default class ServiceRequestListItem extends Component {
  serviceAllow = () => {
    BusinessApi.allowRequest({ id: this.props._id }).then(() => this.props.reloadList());
  };

  serviceRefuse = () => {
    BusinessApi.refuseRequest({ id: this.props._id }).then(() => this.props.reloadList());
  };

  render() {
    return (
      <tr>
        <td>{this.props.shop.SHOPNAME}</td>
        <td>{this.props.USERNAME}</td>
        <td>{this.props.DAY}일</td>
        <td>{accounting.formatMoney(this.props.PRICE, { symbol: "원", format: "%v %s", precision: 0 })}</td>
        <td>{this.props.ACCOUNT}</td>
        <td>{moment(this.props.createdAt).fromNow()}</td>
        <td>
          <ButtonGroup>
            {this.props.ADMISSION !== false ? (
              <Button color="success" onClick={this.serviceAllow} disabled={this.props.ADMISSION === true}>
                {this.props.ADMISSION === true ? "승인됨" : "승인"}
              </Button>
            ) : null}
            {this.props.ADMISSION !== true ? (
              <Button color="danger" onClick={this.serviceRefuse} disabled={this.props.ADMISSION === false}>
                {this.props.ADMISSION === false ? "거절됨" : "거절"}
              </Button>
            ) : null}
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
