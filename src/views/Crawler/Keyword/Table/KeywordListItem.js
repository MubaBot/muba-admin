import React, { Component } from "react";
import { Button } from "reactstrap";
import moment from "moment";
import "moment/locale/ko";

import { reWork } from "api/axios/crawler/works";

class KeywordListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date
    };
  }

  componentDidMount = () => {
    this.setState({
      date: moment(this.props.date).format("YYYY-MM-DD HH:mm:SS")
    });
  };

  reWork = () => {
    reWork({ keyword: this.props.keyword })
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
        <td className="text-center">{this.props.keyword}</td>
        <td className="text-center">{this.state.date}</td>
        <td className="text-center">{this.props.worker}</td>
        <td className="text-center">
          <Button block color="ghost-primary" onClick={this.reWork}>
            작업 등록
          </Button>
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

export default KeywordListItem;
