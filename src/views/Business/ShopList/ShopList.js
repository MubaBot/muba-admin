import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ShopList } from "./Table";

export default class Shop extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> 전체 가게
          </CardHeader>
          <CardBody>
            <ShopList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
