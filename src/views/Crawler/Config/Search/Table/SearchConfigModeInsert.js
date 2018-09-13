import React, { Component, Fragment } from "react";
import { Button, Input } from "reactstrap";

import { appendSearchMode } from "api/axios/crawler/config";

class SearchConfigModeInsert extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "에러", id: "", name: "", param: "", value: "" };
  }

  onChange = e => {
    this.onDismiss();
    this.setState({ [e.target.name]: e.target.value });
  };
  onDismiss = () => this.setState({ visible: false });
  showAlert = msg => this.setState({ visible: true, alert: msg });
  clearInput = () => this.setState({ id: "", name: "", param: "", value: "" });

  onEnterKeyPress = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.Button.onClick(e);
  };

  onSubmit = e => {
    e.preventDefault();
    appendSearchMode({ _id: this.props._id, id: this.state.id, name: this.state.name, param: this.state.param, value: this.state.value })
      .then(() => {
        this.clearInput();
        this.props.reloadList();
      })
      .catch(e => {});
  };

  render() {
    return (
      <Fragment>
        <td className="text-center">
          <Input name="id" value={this.state.id} placeholder="ID" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="name" value={this.state.name} placeholder="이름" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="param" value={this.state.param} placeholder="쿼리" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="value" value={this.state.value} placeholder="값" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>

        <td className="text-center">
          <Button block color="ghost-primary" onClick={this.onSubmit}>
            추가
          </Button>
        </td>
      </Fragment>
    );
  }
}

export default SearchConfigModeInsert;
