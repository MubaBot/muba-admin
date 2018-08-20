import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { getWorkerByKeyword } from "api/axios/crawler/worker";

class WorkerList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { update: false, received: false, dropdownOpen: false, worker: [], count: props.count };
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen, received: false });
  };

  componentWillReceiveProps = props => {
    this.setState({ update: true });
  };

  componentWillUpdate = (props, state) => {
    if (state.dropdownOpen && !state.received)
      return getWorkerByKeyword({ keyword: this.props.keyword })
        .then(result =>
          this.setState({
            received: true,
            worker: result.data,
            count: result.data.length
          })
        )
        .catch(err => {});

    if (state.update) this.setState({ count: props.count, update: false });
  };

  DropdownItems = () => {
    if (this.state.worker.length)
      return this.state.worker.map((x, i) => (
        <DropdownItem key={x.id}>
          {x.name} ({x.page}번 검색 중)
        </DropdownItem>
      ));
    return <DropdownItem disabled>작업이 없습니다.</DropdownItem>;
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle tag="span" onClick={() => this.toggle()} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
          {this.state.count || "0"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.keyword}</DropdownItem>
          {this.DropdownItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default WorkerList;
