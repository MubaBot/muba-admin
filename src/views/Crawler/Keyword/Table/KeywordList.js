import React, { Component, Fragment } from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import KeywordListItem from "./KeywordListItem";
import { getList } from "api/axios/crawler/keyword";

class KeywordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.match.params.page || 1
    };
  }

  updateKeywordList() {
    getList({ page: this.state.page })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  componentDidMount = () => this.updateKeywordList();
  componentWillUpdate = () => this.updateKeywordList();

  render() {
    return (
      <Fragment>
        <Table responsive striped>
          <thead>
            <tr>
              <th className="text-center">Keyword</th>
              <th className="text-center">Date registered</th>
              <th className="text-center">Worker count</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <KeywordListItem />
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
