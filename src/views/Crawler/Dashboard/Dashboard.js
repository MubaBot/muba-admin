import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Scrap } from "./Graph";

class Keyword extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" /> Crawler Status
        </CardHeader>
        <CardBody>
          <Scrap {...this.props} />
        </CardBody>
      </Card>
    );
  }
}

export default Keyword;
