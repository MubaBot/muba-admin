import React, { Component } from "react";
import { Button } from "reactstrap";

import ShopDetail from "./ShopDetail";

import { deleteShopById } from "api/axios/crawler/shops";

class ShopListItem extends Component {
  deleteShop = () => {
    deleteShopById({ id: this.props.id })
      .then(() => this.props.reloadList())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td className="text-center">
          <a href={this.props.url} target="_blank">
            {this.props.name}
          </a>
        </td>
        <td className="text-center">
          {this.props.place.state} {this.props.place.city} {this.props.place.address1} {this.props.place.options}
        </td>

        <td className="text-center">
          <ShopDetail type="Time" name={this.props.name} times={this.props.times} count={this.props.times.length} />
        </td>
        <td className="text-center">{this.props.tel}</td>

        <td className="text-center">
          <ShopDetail type="Menu" name={this.props.name} menu={this.props.menus} count={this.props.menus.length} />
        </td>
        <td className="text-center">
          <Button block color="ghost-danger" onClick={this.deleteShop}>
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

export default ShopListItem;
