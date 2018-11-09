import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import MemberList from "./Table";

export default class Member extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Shops
          </CardHeader>
          <CardBody>
            <MemberList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
