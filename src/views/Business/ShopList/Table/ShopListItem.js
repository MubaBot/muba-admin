import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import Switch from "react-switch";

import { BusinessApi } from "api";

export default class ShopListItem extends Component {
  deleteShop = () => {
    BusinessApi.deleteShopByAdmin({ id: this.props._id }).then(() => this.props.reloadList());
  };

  serachOwner = () => {
    if (this.props.OWNERID) return "/business/shop/1/owner/" + this.props.owner.ID;
    return "#";
  };

  render() {
    return (
      <tr>
        <td className="text-center">{this.props.SHOPNAME}</td>
        <td className="text-center">
          <Link
            onClick={this.searchOwner}
            to={this.serachOwner()}
            style={this.props.OWNERID ? { color: "#20a8d8" } : { color: "#23282c", textDecoration: "none", cursor: "context-menu" }}
          >
            {this.props.OWNERID ? this.props.owner.USERNAME : "주인 없음"}
          </Link>
        </td>
        <td className="text-center">{[this.props.ADDRESS, this.props.ADDRESSDETAIL].join(" ")}</td>
        <td className="text-center">{this.props.PHONE}</td>
        <td className="text-center">{this.props.HOMEPAGE}</td>
        <td className="text-center">{this.props.shop_menus.length}</td>
        <td className="text-center">
          <Switch
            className="switch"
            onChange={() => null}
            disabled={true}
            checked={this.props.OPEN}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
            width={48}
          />
        </td>
        <td className="text-center">
          <Switch
            className="switch"
            onChange={() => null}
            disabled={true}
            checked={this.props.DELIVERY}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
            width={48}
          />
        </td>
        <td className="text-center">{this.props.shop_service ? this.props.shop_service.ENDDATE : "사용 안함"}</td>
        {this.props.mode === "address" ? (
          <td className="text-center">
            <Button block color="ghost-primary" onClick={() => this.props.servicePopup(this.props._id, this.props.ADDRESS)}>
              좌표 적용
            </Button>
          </td>
        ) : null}
        <td className="text-center">
          <Button block color="ghost-danger" onClick={this.deleteShop}>
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}
