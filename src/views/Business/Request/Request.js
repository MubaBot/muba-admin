import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import RequestList from "./Table";

export default class Request extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Shops
          </CardHeader>
          <CardBody>
            <RequestList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
