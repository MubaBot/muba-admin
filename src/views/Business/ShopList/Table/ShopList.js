import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";

import Pagination from "components/Pagination";

import { SearchForm } from "../Form";
import ShopListItem from "./ShopListItem";
import AddressSettingModal from "./AddressSettingModal";

import { BusinessApi } from "api";

export default class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      count: 0,
      mode: this.props.match.params.mode || "none",
      keyword: this.props.match.params.keyword || "",
      modal: false,
      service: -1,
      address: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    const page = parseInt(nextProps.match.params.page, 10) || 1;
    const mode = nextProps.match.params.mode || "none";
    const keyword = nextProps.match.params.keyword || "";

    this.setState({ page: page, lists: [], count: 0, mode: mode, keyword: keyword });
    this.updateShopList(page, mode, keyword, keyword);
  };

  updateShopList = async (page, mode, name, owner) => {
    const p = page || this.state.page;
    const m = mode || this.state.mode;
    const n = name || this.state.keyword;
    const o = owner || this.state.keyword;

    return BusinessApi.getShopListForAdmin({ page: p, mode: m, name: n, owner: o })
      .then(result => {
        this.setState({
          lists: result.data.lists,
          count: result.data.count,
          display: result.data.displayCount
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMode = match => {
    if (match.params.name) return "name";
    if (match.params.owner) return "owner";

    const path = match.path.split("/");
    if (path[path.length - 1] === "address") return "address";
    return null;
  };

  getModePath = () => {
    switch (this.state.mode) {
      case "address":
        return "/address";
      case "name":
        return "/name/" + this.state.keyword;
      case "owner":
        return "/owner/" + this.state.keyword;
      default:
        return "";
    }
  };

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ page: page });
    if (this.state.page !== page) {
      this.updateShopList(page);
      this.props.history.push("/business/shop/" + page + (this.state.mode ? this.getModePath() : ""));
    }
  };

  componentDidMount = () => this.updateShopList();

  toggle = () => this.setState({ modal: !this.state.modal });
  servicePopup = (id, address) => {
    this.toggle();
    this.setState({ service: id, address: address });
  };

  closePopup = () => {
    this.toggle();
    this.updateShopList();
  };

  render() {
    return (
      <Fragment>
        <SearchForm reloadList={this.updateShopList} history={this.props.history} mode={this.state.mode} />
        <Table responsive striped>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-center">가게 이름</th>
              <th className="text-center">주인 이름</th>
              <th className="text-center">주소</th>
              <th className="text-center">전화번호</th>
              <th className="text-center">홈페이지</th>
              <th className="text-center">메뉴 수</th>
              <th className="text-center">영업 여부</th>
              <th className="text-center">배달 여부</th>
              <th className="text-center">서비스 만료</th>
              {this.state.mode === "address" ? <th className="text-center">좌표</th> : null}
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <ShopListItem
                key={x._id}
                {...x}
                reloadList={this.updateShopList}
                mode={this.state.mode}
                history={this.props.history}
                servicePopup={this.servicePopup}
              />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
        {this.state.modal ? (
          <AddressSettingModal
            service={this.state.service}
            address={this.state.address}
            toggle={this.toggle}
            modal={this.state.modal}
            closePopup={this.closePopup}
          />
        ) : null}
      </Fragment>
    );
  }
}
