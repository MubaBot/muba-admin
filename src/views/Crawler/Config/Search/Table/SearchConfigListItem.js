import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";

import SearchConfigModeInsert from "./SearchConfigModeInsert";

import { deleteMode, deleteSearchConfig } from "api/axios/crawler/config";

class KeywordListItem extends Component {
  removeConfig = async () => {
    deleteSearchConfig({ id: this.props._id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  removeMode = async id => {
    deleteMode({ id: this.props._id, mode: id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <tr>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.id}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.name}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.url}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.query}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.tag}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.page.param}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.page.count}
          </td>
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            {this.props.page.start}
          </td>
          <SearchConfigModeInsert _id={this.props._id} reloadList={this.props.reloadList} />
          <td rowSpan={this.props.mode.length + 1} className="text-center">
            <Button block color="ghost-danger" onClick={this.removeConfig}>
              삭제
            </Button>
          </td>
        </tr>
        {this.props.mode.map((x, i) => (
          <tr key={i}>
            <td>{x.id}</td>
            <td>{x.name}</td>
            <td>{x.param}</td>
            <td>{x.value}</td>
            <td className="text-center">
              <Button block color="ghost-danger" onClick={() => this.removeMode(x.id)}>
                삭제
              </Button>
            </td>
          </tr>
        ))}
      </Fragment>
    );
  }
}

export default KeywordListItem;
