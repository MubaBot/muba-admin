import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { isEqual } from "lodash";

import KeywordListItem from "./KeywordListItem";
import KeywordPagination from "./KeywordPagination";
import { getList } from "api/axios/crawler/keyword";

class KeywordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lastPage: 0,
      lists: [],
      update: true,
      count: 0
    };

    this.updateKeywordList().then(state => (this.state.count = state.count));
    this.onChangePage(this.state.page);
  }

  updateKeywordList = async page => {
    const p = page || this.state.page;

    return getList({ page: p })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists,
          update: update,
          count: result.data.count,
          display: result.data.displayCount,
          lastPage: p
        });

        return this.state;
      })
      .catch(err => {
        this.setState({ lastPage: p });
        console.log(err);
      });
  };

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ update: true, page: page, lastPage: this.state.page });
    if (this.state.page !== page) {
      this.updateKeywordList(page);
      this.props.history.push("/crawler/keywords/" + page);
    }
  };

  // shouldComponentUpdate = () => {
  //   if (this.state.lastPage === this.state.page) return false;
  //   return this.state.update;
  // };

  componentDidMount = () => this.updateKeywordList();
  // componentWillUpdate = () => this.updateKeywordList();

  render() {
    return (
      <Fragment>
        <Table responsive striped>
          <colgroup>
            <col />
            <col width="25%" />
            <col width="15%" />
            <col width="75px" />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-center">키워드</th>
              <th className="text-center">등록일</th>
              <th className="text-center">작업수</th>
              <th className="text-center">재검색</th>
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <KeywordListItem key={x._id} id={x._id} keyword={x.keyword} date={x.createdAt} />
            ))}
          </tbody>
        </Table>
        <KeywordPagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
      </Fragment>
    );
  }
}

export default KeywordList;
