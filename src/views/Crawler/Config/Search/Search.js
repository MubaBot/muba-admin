import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { SearchConfigList } from "./Table";

class Search extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" /> Search Configuration
        </CardHeader>
        <CardBody>
          <SearchConfigList {...this.props} />
        </CardBody>
      </Card>
    );
  }
}
export default Search;
