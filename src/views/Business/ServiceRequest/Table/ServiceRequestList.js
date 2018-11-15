import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

import Pagination from "components/Pagination";
import ServiceRequestListItem from "./ServiceRequestListItem";

import { BusinessApi } from "api";

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      count: 0
    };
  }

  updateRequestList = async page => {
    const p = page || this.state.page;

    return BusinessApi.getRequestShopService({ page: p })
      .then(result => {
        this.setState({
          lists: result.data.lists,
          count: result.data.count,
          display: result.data.displayCount
        });
      })
      .catch(err => console.log(err));
  };

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ page: page });
    if (this.state.page !== page) {
      this.updateRequestList(page);
      this.props.history.push("/business/service/" + page);
    }
  };

  componentDidMount = () => this.updateRequestList();

  render() {
    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>가게 이름</th>
              <th>입금자 이름</th>
              <th>기간</th>
              <th>가격</th>
              <th>환불 계좌</th>
              <th>요청 시간</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <ServiceRequestListItem key={x._id} id={x._id} {...x} reloadList={this.updateRequestList} />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
      </Fragment>
    );
  }
}
