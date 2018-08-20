import React, { Component } from "react";
import { Button } from "reactstrap";

class WorkingListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.url}</td>
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
