import React, { Component } from "react";
import { Alert, Button, Input } from "reactstrap";

import { insertSearchConfig } from "api/axios/crawler/config";

class SearchConfigListInsert extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "에러", id: "", name: "", url: "", query: "", tag: "", page: "", count: 0, start: 0 };
  }

  onChange = e => {
    this.onDismiss();
    this.setState({ [e.target.name]: e.target.value });
  };
  onDismiss = () => this.setState({ visible: false });
  showAlert = msg => this.setState({ visible: true, alert: msg });
  clearInput = () => this.setState({ id: "", name: "", url: "", query: "", tag: "", page: "", count: 0, start: 0 });

  onEnterKeyPress = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.Button.onClick(e);
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.id === "") return this.showAlert("ID를 입력해 주세요.");
    if (this.state.name === "") return this.showAlert("이름을 입력해 주세요.");
    if (this.state.url === "") return this.showAlert("URL를 입력해 주세요.");
    if (this.state.query === "") return this.showAlert("쿼리를 입력해 주세요.");
    if (this.state.tag === "") return this.showAlert("태그를 입력해 주세요.");
    if (this.state.page === "") return this.showAlert("페이지를 입력해 주세요.");

    insertSearchConfig({ id: this.state.id, url: this.state.url, name: this.state.name, query: this.state.query, tag: this.state.tag, page: this.state.page, count: this.state.count, start: this.state.start })
      .then(() => {
        this.setState({ visible: false, keyword: "" });
        this.clearInput();
        this.props.reloadList();
      })
      .catch(e => {
        if (e.response === undefined) return this.showAlert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        switch (e.response.data.success) {
          case -1:
            return this.showAlert("ID를 입력해 주세요.");
          case -2:
            return this.showAlert("이름을 입력해 주세요.");
          case -3:
            return this.showAlert("URL를 입력해 주세요.");
          case -4:
            return this.showAlert("쿼리를 입력해 주세요.");
          case -5:
            return this.showAlert("태그를 입력해 주세요.");
          case -6:
            return this.showAlert("페이지를 입력해 주세요.");
          case -7:
            return this.showAlert("올바른 단위를 입력해 주세요.");
          case -8:
            return this.showAlert("올바른 시작을 입력해 주세요.");
          case -9:
            return this.showAlert("이미 존재하는 설정입니다.");
          default:
            return this.showAlert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      });
  };

  render() {
    return (
      <tr>
        <td className="text-center">
          <Input name="id" value={this.state.id} placeholder="ID" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="name" value={this.state.name} placeholder="이름" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="url" value={this.state.url} placeholder="URL" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="query" value={this.state.query} placeholder="쿼리" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="tag" value={this.state.tag} placeholder="태그" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>

        <td className="text-center">
          <Input name="page" value={this.state.page} placeholder="페이지" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="count" value={this.state.count} placeholder="단위" type="number" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="start" value={this.state.start} placeholder="시작" type="number" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>

        <td colSpan="4" className="text-center">
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.alert}
          </Alert>
        </td>

        <td colSpan="2" className="text-center">
          <Button ref="Button" color="primary" onClick={this.onSubmit}>
            추가
          </Button>
        </td>
      </tr>
    );
  }
}

export default SearchConfigListInsert;
