import React, { Component } from "react";
import { Button } from "reactstrap";
import cheerio from "cheerio";

import ContentView from "./ContentView";

import { deleteContent } from "api/axios/crawler/contents";

class ContentListItem extends Component {
  constructor(props) {
    super(props);

    const t = cheerio(this.props.title).text();

    this.state = {
      title: t ? t : props.title
    };
  }

  deleteContent = () => {
    deleteContent({ id: this.props.id })
      .then(result => {
        this.props.reloadList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <tr>
        <td className="text-center">{this.state.title}</td>
        <td>
          <ContentView id={this.props.id} url={this.props.url} title={this.state.title} />
        </td>
        <td className="text-center">
          <Button block color="ghost-danger" onClick={this.deleteContent}>
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

export default ContentListItem;
