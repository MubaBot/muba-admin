import React, { Component, Fragment } from "react";
import { Table, Label, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from "reactstrap";
import { isEqual } from "lodash";

import ShopListItem from "./ShopListItem";
import Pagination from "components/Pagination";

import { getList, moveShops, reSearch } from "api/axios/crawler/shops";

class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      update: true,
      count: 0,
      modal: false,
      now: 0
    };
  }

  componentDidMount = () => this.updateShopList();

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ update: true, page: page });
    if (this.state.page !== page) {
      this.updateShopList(page);
      this.props.history.push("/crawler/shops/" + page);
    }
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  updateShopList = page => {
    const p = page || this.state.page;

    return getList({ page: p })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists,
          update: update,
          count: result.data.count,
          display: result.data.displayCount,
          now: 0
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  moveShops = async () => {
    this.toggle();
    this.setState({ now: 0 });
    const pages = Math.ceil(this.state.count / this.state.display);
    var i = 0;
    for (i = 0; i < pages && (this.state.now === 0 || this.state.modal); i++) {
      const result = await moveShops({ page: i, pageCount: this.state.display })
        .then(() => this.setState({ now: this.state.now + this.state.display }))
        .catch(() => false);

      if (result === false) {
        alert("fail");
        this.toggle();
        return this.updateShopList();
      }
    }

    if (i === pages) this.toggle();

    this.updateShopList();
  };

  reSearch = async () => {
    this.toggle();
    this.setState({ now: 0 });
    const pages = Math.ceil(this.state.count / this.state.display);
    var i = 0;
    for (i = 0; i < pages && (this.state.now === 0 || this.state.modal); i++) {
      const result = await reSearch({ count: this.state.display })
        .then(() => this.setState({ now: this.state.now + this.state.display }))
        .catch(() => false);

      if (result === false) {
        alert("fail");
        this.toggle();
        return this.updateShopList();
      }
    }

    if (i === pages) this.toggle();

    this.updateShopList();
  };

  render() {
    return (
      <Fragment>
        <Label>전체 {this.state.count}개</Label>
        <Row className="mb-3">
          <Col>
            <Button className="float-right" color="success" onClick={this.moveShops}>
              데이터 이동
            </Button>
            <Button className="float-right" style={{ marginRight: "10px" }} color="success" onClick={this.reSearch}>
              데이터 재검색
            </Button>
          </Col>
        </Row>
        <Table responsive striped>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col width="75px" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-center">가게명</th>
              <th className="text-center">주소</th>
              <th className="text-center">영업 시간</th>
              <th className="text-center">번호</th>
              <th className="text-center">메뉴</th>
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <ShopListItem key={x._id} id={x._id} {...x} reloadList={this.updateShopList} />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {this.state.now} / {this.state.count}개 진행중
          </ModalHeader>

          <ModalBody>
            <Progress animated value={(this.state.now / this.state.count) * 100} />
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ShopList;
