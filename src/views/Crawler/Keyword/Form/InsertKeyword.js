import React, { Component, Fragment } from "react";
import { Alert, Button, Col, Row, FormGroup, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { create } from "api/axios/crawler/keyword";

class InsertKeyword extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "에러", keyword: "" };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onEnterKeyPress = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.Button.onClick(e);
  };

  onSubmit = e => {
    e.preventDefault();
    create({
      keyword: this.state.keyword
    })
      .then(() => this.setState({ keyword: "" }))
      .catch(e => {
        switch (e.response.data.success) {
          case -1:
            return this.setState({ visible: true, alert: "키워드를 입력해 주세요." });
          default:
            return this.setState({ visible: true, alert: "죄송합니다. 잠시 후 다시 시도해 주세요." });
        }
      });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col xs="8" />
          <Col xs="4">
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.alert}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col xs="8" />
          <Col xs="4">
            <FormGroup>
              <InputGroup>
                <Input required name="keyword" value={this.state.keyword} placeholder="New keyword" size="16" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
                <InputGroupAddon addonType="append">
                  <Button ref="Button" color="secondary" onClick={this.onSubmit}>
                    추가
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default InsertKeyword;
