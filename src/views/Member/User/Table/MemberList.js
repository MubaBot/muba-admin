import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { isEqual } from "lodash";

import Pagination from "components/Pagination";
import MemberListItem from "./MemberListItem";

import { UserApi } from "api";

export default class MemberList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      count: 0,

      modalUrl: ""
    };
  }

  updateMemberList = async page => {
    const p = page || this.state.page;

    return UserApi.getUserMemberList({ page: p })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists,
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
      this.updateMemberList(page);
      this.props.history.push("/member/owner/" + page);
    }
  };

  componentDidMount = () => this.updateMemberList();

  render() {
    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>차단</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <MemberListItem key={x._id} id={x._id} {...x} reloadList={this.updateMemberList} />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
      </Fragment>
    );
  }
}
