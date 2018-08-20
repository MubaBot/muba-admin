import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { ContentList } from "./Table";

class CrawlerContents extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Contents
          </CardHeader>
          <CardBody>
            <ContentList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default CrawlerContents;
