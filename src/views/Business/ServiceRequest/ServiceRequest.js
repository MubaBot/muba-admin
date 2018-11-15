import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import ServiceRequestList from "./Table";

export default class ServiceRequest extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Service
          </CardHeader>
          <CardBody>
            <ServiceRequestList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
