import React, { Component } from "react";

import { Content } from "./Content";
import { Search } from "./Search";

class CrawlerConfig extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Search {...this.Search} />
        <Content {...this.props} />
      </div>
    );
  }
}
export default CrawlerConfig;
