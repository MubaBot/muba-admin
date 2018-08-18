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

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.keyword);
    create({
      keyword: this.state.keyword
    })
      .then(result => {
        console.log(result);
        // this.props.history.push("/dashboard");
      })
      .catch(e => {
        console.log(e);
        // return this.setState({ visible: true, alert: "계정 정보를 확인해 주세요." });
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
                <Input required name="keyword" placeholder="New keyword" size="16" type="text" onChange={this.onChange} />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" onClick={this.onSubmit}>
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
