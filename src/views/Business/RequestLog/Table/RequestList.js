import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { isEqual } from "lodash";

import Pagination from "components/Pagination";
import RequestListItem from "./RequestListItem";
import PhotoModal from "./PhotoModal";

import { BusinessApi } from "api";

export default class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      count: 0,

      modalUrl: ""
    };
  }

  updateRequestList = async page => {
    const p = page || this.state.page;

    return BusinessApi.getRequestBusinessLog({ page: p })
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
      this.updateRequestList(page);
      this.props.history.push("/business/request/" + page);
    }
  };

  componentDidMount = () => this.updateRequestList();

  toggle = () => this.setState({ modal: !this.state.modal });

  showPhoto = URL => {
    this.toggle();
    this.setState({ modalUrl: ["https://api.mubabot.com", "static", "business", localStorage.getItem("authentication"), URL].join("/") });
  };

  render() {
    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>가게 이름</th>
              <th>사업자 등록 번호</th>
              <th>대표자</th>
              <th>주소</th>
              <th>사진</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <RequestListItem
                key={x._id}
                id={x._id}
                {...x}
                reloadList={this.updateRequestList}
                showPhoto={this.showPhoto}
                admissionRequest={this.admissionRequest}
              />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
        <PhotoModal URL={this.state.modalUrl} toggle={this.toggle} modal={this.state.modal} />
      </Fragment>
    );
  }
}
