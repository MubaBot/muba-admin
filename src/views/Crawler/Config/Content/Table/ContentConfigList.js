import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

import ContentConfigListItem from "./ContentConfigListItem";
import ContentConfigListInsert from "./ContentConfigListInsert";

import { getContentConfigList } from "api/axios/crawler/config";

class ContentConfigList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  updateContentConfigList = async () => {
    return getContentConfigList()
      .then(result => this.setState({ lists: result.data.lists }))
      .catch(err => {});
  };

  componentDidMount = () => this.updateContentConfigList();

  render() {
    return (
      <Fragment>
        <Table className="multi-header-table" size="sm" borderless responsive>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col width="300px" />
            <col width="75px" />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-center">Domain</th>
              <th className="text-center">Title</th>
              <th className="text-center">Content</th>
              <th className="text-center">Comment</th>
              <th className="text-center" />
              <th className="text-center" />
            </tr>
          </thead>
          <tbody>
            <ContentConfigListInsert reloadList={this.updateContentConfigList} />
            {this.state.lists.map((x, i) => (
              <ContentConfigListItem key={x._id} _id={x._id} {...x} reloadList={this.updateContentConfigList} />
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default ContentConfigList;
