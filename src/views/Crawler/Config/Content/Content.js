import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { ContentConfigList } from "./Table";

class Content extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" /> Content Configuration
        </CardHeader>
        <CardBody>
          <ContentConfigList {...this.props} />
        </CardBody>
      </Card>
    );
  }
}
export default Content;
