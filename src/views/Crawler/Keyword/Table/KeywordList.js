import React, { Component, Fragment } from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import KeywordListItem from "./KeywordListItem";
import { getList } from "api/axios/crawler/keyword";
import { isEqual } from "lodash";

class KeywordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.match.params.page || 1,
      lists: [],
      update: true
    };
  }

  updateKeywordList() {
    getList({ page: this.state.page })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data);

        this.setState({
          lists: update ? result.data : this.state.lists,
          update: update
        });
      })
      .catch(err => console.log(err));
  }

  shouldComponentUpdate = () => this.state.update;
  componentDidMount = () => this.updateKeywordList();
  componentWillUpdate = () => this.updateKeywordList();

  render() {
    return (
      <Fragment>
        <Table responsive striped>
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
              <KeywordListItem key={x._id} id={x._id} keyword={x.keyword} date={x.updatedAt} />
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem disabled>
            <PaginationLink previous tag="button">
              Prev
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink tag="button">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next tag="button">
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Fragment>
    );
  }
}

export default KeywordList;
