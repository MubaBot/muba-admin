import React, { Component } from "react";
import { Alert, Button, Input } from "reactstrap";

import { insertContentConfig } from "api/axios/crawler/config";

class ContentConfigListInsert extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "에러", domain: "", title: "", content: "", comment: "" };
  }

  onChange = e => {
    this.onDismiss();
    this.setState({ [e.target.name]: e.target.value });
  };
  onDismiss = () => this.setState({ visible: false });
  showAlert = msg => this.setState({ visible: true, alert: msg });
  clearInput = () => this.setState({ domain: "", title: "", content: "", comment: "" });

  onEnterKeyPress = e => {
    if (e.target.value === "") return null;
    if (e.key === "Enter") this.refs.Button.onClick(e);
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.domain === "") return this.showAlert("도메인을 입력해 주세요.");
    if (this.state.title === "") return this.showAlert("제목을 입력해 주세요.");
    if (this.state.content === "") return this.showAlert("본문을 입력해 주세요.");
    if (this.state.comment === "") return this.showAlert("댓글을 입력해 주세요.");

    insertContentConfig({ domain: this.state.domain, title: this.state.title, content: this.state.content, comment: this.state.comment })
      .then(() => {
        this.setState({ visible: false, keyword: "" });
        this.clearInput();
        this.props.reloadList();
      })
      .catch(e => {
        if (e.response === undefined) return this.showAlert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        switch (e.response.data.success) {
          case -1:
            return this.showAlert("도메인을 입력해 주세요.");
          case -2:
            return this.showAlert("제목을 입력해 주세요.");
          case -3:
            return this.showAlert("본문을 입력해 주세요.");
          case -4:
            return this.showAlert("댓글을 입력해 주세요.");
          case -5:
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
          <Input name="domain" value={this.state.domain} placeholder="도메인" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="title" value={this.state.title} placeholder="제목" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="content" value={this.state.content} placeholder="본문" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <Input name="comment" value={this.state.comment} placeholder="댓글" type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>

        <td className="text-center">
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

export default ContentConfigListInsert;
