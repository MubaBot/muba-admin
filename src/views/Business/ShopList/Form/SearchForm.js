import React, { Component, Fragment } from "react";
import { Button, Col, Row, FormGroup, Input, InputGroup, InputGroupAddon } from "reactstrap";

import UpdateChatbotModal from "./UpdateChatbotModal";

import { BusinessApi } from "api";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", owner: "", modal: false, now: 0 };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onEnterKeyPressName = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.nameBtn.onClick(e);
  };

  onEnterKeyPressOwner = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.ownerBtn.onClick(e);
  };

  setAddress = () => {
    if (this.props.mode === "address") return this.props.history.push("/business/shop/1");
    this.props.history.push("/business/shop/1/address");
  };

  searchOwner = () => {
    this.props.history.push("/business/shop/1/owner/" + this.state.owner);
  };

  searchName = () => {
    this.props.history.push("/business/shop/1/name/" + this.state.name);
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  updateChatbotData = async () => {
    this.toggle();
    this.setState({ now: 0 });
    const pages = Math.ceil(this.props.count / this.props.display);
    var i = 0;
    for (i = 0; i < pages && (this.state.now === 0 || this.state.modal); i++) {
      const result = await BusinessApi.updateChatbotData({ page: i })
        // const result = await reSearch({ count: this.state.display })
        .then(() => this.setState({ now: this.state.now + this.props.display }))
        .catch(() => false);

      if (result === false) {
        alert("fail");
        return this.toggle();
      }
    }

    if (i === pages) this.toggle();
    this.setState({ now: 0 });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col xs="2">
            <Button onClick={this.updateChatbotData}>챗봇 데이터 갱신</Button>
          </Col>
          <Col xs="3" />
          <Col xs="3">
            <FormGroup>
              <InputGroup>
                <Input
                  required
                  name="owner"
                  value={this.state.owner}
                  placeholder="주인 아이디"
                  size="16"
                  type="text"
                  onChange={this.onChange}
                  onKeyPress={this.onEnterKeyPressOwner}
                />
                <InputGroupAddon addonType="append">
                  <Button ref="ownerBtn" color="secondary" onClick={this.searchOwner}>
                    검색
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xs="3">
            <FormGroup>
              <InputGroup>
                <Input
                  required
                  name="name"
                  value={this.state.name}
                  placeholder="상점 이름"
                  size="16"
                  type="text"
                  onChange={this.onChange}
                  onKeyPress={this.onEnterKeyPressName}
                />
                <InputGroupAddon addonType="append">
                  <Button ref="nameBtn" color="secondary" onClick={this.searchName}>
                    검색
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xs="1">
            <Button color="secondary" onClick={this.setAddress}>
              {this.props.mode === "address" ? "일반 검색" : "좌표 검색"}
            </Button>
          </Col>
        </Row>
        <UpdateChatbotModal modal={this.state.modal} toggle={this.toggle} now={this.state.now} count={this.props.count} />
      </Fragment>
    );
  }
}
