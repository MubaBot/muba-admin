import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import { ShopList } from "./Table";

class Keyword extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Shops
          </CardHeader>
          <CardBody>
            <ShopList {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Keyword;
