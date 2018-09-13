import React, { Component } from "react";
import { Alert, Button, Input } from "reactstrap";

import { updateContentConfig, deleteContentConfig } from "api/axios/crawler/config";

class ContentConfigListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, modifing: false, alert: "에러", title: props.title, content: props.content, comment: props.comment };
  }

  onChange = e => {
    this.onDismiss();
    this.setState({ [e.target.name]: e.target.value });
  };
  onDismiss = () => this.setState({ visible: false });
  showAlert = msg => this.setState({ visible: true, alert: msg });
  clearInput = () => this.setState({ domain: "", title: "", content: "", comment: "" });

  onEnterKeyPress = e => {
    if (e.key === "Enter") this.onModify();
  };

  onModify = async () => {
    if (!this.state.modifing) return this.setState({ modifing: true });

    updateContentConfig({
      domain: this.props.domain,
      title: this.state.title !== "" ? this.state.title : this.props.title,
      content: this.state.content !== "" ? this.state.content : this.props.content,
      comment: this.state.comment !== "" ? this.state.comment : this.props.comment
    })
      .then(() => {
        this.setState({
          modifing: false,
          title: this.state.title !== "" ? this.state.title : this.props.title,
          content: this.state.content !== "" ? this.state.content : this.props.content,
          comment: this.state.comment !== "" ? this.state.comment : this.props.comment
        });
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
            return this.showAlert("존재하지 않는 설정입니다.");
          default:
            return this.showAlert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      });
  };

  removeConfig = async () => {
    deleteContentConfig({ id: this.props._id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td className="text-center">{this.props.domain}</td>
        <td className="text-center">
          <span hidden={this.state.modifing}>{this.state.title}</span>
          <Input hidden={!this.state.modifing} name="title" value={this.state.title} placeholder={this.props.title} type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <span hidden={this.state.modifing}>{this.state.content}</span>
          <Input hidden={!this.state.modifing} name="content" value={this.state.content} placeholder={this.props.content} type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>
        <td className="text-center">
          <span hidden={this.state.modifing}>{this.state.comment}</span>
          <Input hidden={!this.state.modifing} name="comment" value={this.state.comment} placeholder={this.props.comment} type="text" onChange={this.onChange} onKeyPress={this.onEnterKeyPress} />
        </td>

        <td>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.alert}
          </Alert>
        </td>

        <td className="text-center">
          <Button block color="ghost-primary" onClick={this.onModify}>
            수정
          </Button>
        </td>
        <td className="text-center">
          <Button block color="ghost-danger" onClick={this.removeConfig}>
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

export default ContentConfigListItem;
