import React, { Component, Fragment } from "react";
import { Table, Label } from "reactstrap";
import { isEqual } from "lodash";

import ContentListItem from "./ContentListItem";

import { getList } from "api/axios/crawler/contents";

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      update: true,
      count: 0
    };
  }

  updateKeywordList = async page => {
    const p = page || this.state.page;

    return getList({ page: p })
      .then(result => {
        console.log(result);
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists,
          update: update,
          count: result.data.count,
          display: result.data.displayCount
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ update: true, page: page });
    if (this.state.page !== page) {
      this.updateKeywordList(page);
      this.props.history.push("/crawler/contents/" + page);
    }
  };

  componentDidMount = () => this.updateKeywordList();

  render() {
    return (
      <Fragment>
        <Label>전체 {this.state.count}개</Label>
        <Table responsive striped>
          <colgroup>
            <col width="60%" />
            <col />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-center">제목</th>
              <th className="text-center">URL</th>
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <ContentListItem key={x._id} id={x._id} title={x.title} url={x.url} reloadList={this.updateKeywordList} />
            ))}
          </tbody>
        </Table>
        {/* <KeywordPagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} /> */}
      </Fragment>
    );
  }
}

export default ContentList;
