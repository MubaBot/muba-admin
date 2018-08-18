import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { KeywordList } from "./Table";
import { InsertKeyword } from "./Form";

class Keyword extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Keywords
          </CardHeader>
          <CardBody>
            <InsertKeyword />
            <KeywordList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Keyword;
