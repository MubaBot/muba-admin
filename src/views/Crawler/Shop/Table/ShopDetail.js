import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";

const zeroPadding = x => (x < 10 ? "0" + x : x);

class ShopDetail extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { dropdownOpen: false, menu: this.props.menu };
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  DropdownMenuItems = () => {
    if (this.props.count)
      return this.props.menu.map((x, i) => (
        <DropdownItem key={x._id}>
          {x.name} - {x.price}원
        </DropdownItem>
      ));
    return <DropdownItem disabled>메뉴 정보가 없습니다.</DropdownItem>;
  };

  DropdownTimeItems = () => {
    if (this.props.count)
      return this.props.times.map((x, i) => (
        <DropdownItem key={x._id}>
          {x.day}: {zeroPadding(x.open.hour)}:{zeroPadding(x.open.minute)} ~ {zeroPadding(x.close.hour)}:{zeroPadding(x.close.minute)}
        </DropdownItem>
      ));
    return <DropdownItem disabled>영업 시간 정보가 없습니다.</DropdownItem>;
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle tag="span" onClick={() => this.toggle()} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
          {this.props.count || "0"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.name}</DropdownItem>
          {this.props.type === "Time" ? this.DropdownTimeItems() : this.DropdownMenuItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ShopDetail;
