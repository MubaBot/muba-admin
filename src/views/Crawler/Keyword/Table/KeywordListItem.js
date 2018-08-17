import React, { Component } from "react";
import { Button } from "reactstrap";

class KeywordListItem extends Component {
  render() {
    return (
      <tr>
        <td className="text-center">Yiorgos Avraamu</td>
        <td className="text-center">2012/01/01</td>
        <td className="text-center">0</td>
        <td className="text-center">
          <Button block outline color="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default KeywordListItem;
