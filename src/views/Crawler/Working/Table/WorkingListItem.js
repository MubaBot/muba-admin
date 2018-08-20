import React, { Component } from "react";
import { Button } from "reactstrap";

class WorkingListItem extends Component {
  render() {
    return (
      <tr>
        <td>
          <a href={this.props.url} target="_blank">
            {this.props.url}
          </a>
        </td>
        <td className="text-center">
          <Button block color="ghost-danger">
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

export default WorkingListItem;
