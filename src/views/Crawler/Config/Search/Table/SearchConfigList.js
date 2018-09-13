import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

import SearchConfigListItem from "./SearchConfigListItem";
import SearchConfigListInsert from "./SearchConfigListInsert";

import { getSearchConfigList } from "api/axios/crawler/config";

class SearchConfigList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  updateSearchConfigList = async () => {
    return getSearchConfigList()
      .then(result => this.setState({ lists: result.data.lists }))
      .catch(err => {});
  };

  componentDidMount = () => this.updateSearchConfigList();

  render() {
    return (
      <Fragment>
        <Table className="multi-header-table" size="sm" borderless responsive>
          <colgroup>
            <col width="7.5%" />
            <col width="12.5%" />
            <col />
            <col width="7.5%" />
            <col />
            <col width="7.5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="6%" />
            <col width="10%" />
            <col width="6%" />
            <col width="6%" />
            <col width="75px" />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan="2" className="text-center">
                ID
              </th>
              <th rowSpan="2" className="text-center">
                Name
              </th>
              <th rowSpan="2" className="text-center">
                URL
              </th>
              <th rowSpan="2" className="text-center">
                Query
              </th>
              <th rowSpan="2" className="text-center">
                Tag
              </th>
              <th rowSpan="2" className="text-center">
                Page
              </th>
              <th rowSpan="2" className="text-center">
                Count
              </th>
              <th rowSpan="2" className="text-center">
                Start
              </th>
              <th colSpan="5" className="text-center">
                Mode
              </th>
              <th rowSpan="2" className="text-center" />
            </tr>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Param</th>
              <th className="text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            <SearchConfigListInsert reloadList={this.updateSearchConfigList} />
            {this.state.lists.map((x, i) => (
              <SearchConfigListItem key={x._id} _id={x._id} {...x} reloadList={this.updateSearchConfigList} />
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default SearchConfigList;
