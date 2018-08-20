import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

class Working extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Working
          </CardHeader>
          <CardBody />
        </Card>
      </div>
    );
  }
}
export default Working;
