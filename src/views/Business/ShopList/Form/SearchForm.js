import React, { Component, Fragment } from "react";
import { Button, Col, Row, FormGroup, Input, InputGroup, InputGroupAddon } from "reactstrap";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", owner: "" };
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

  render() {
    return (
      <Fragment>
        <Row>
          <Col xs="5" />
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
      </Fragment>
    );
  }
}
