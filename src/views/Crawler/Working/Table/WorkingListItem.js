import React, { Component } from "react";
import { Button } from "reactstrap";

import { deleteWorkingById } from "api/axios/crawler/working";

class WorkingListItem extends Component {
  deleteWorking = () => {
    deleteWorkingById({ id: this.props.id })
      .then(result => {
        console.log(result);
        this.props.reloadList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <tr>
        <td>
          <a href={this.props.url} target="_blank">
            {this.props.url}
          </a>
        </td>
        <td className="text-center">
          <Button block color="ghost-danger" onClick={this.deleteWorking}>
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

export default WorkingListItem;
