import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import SVG from "react-inlinesvg";
import SearchIcon from "assets/img/icons/icon-search.svg";

import { BusinessApi } from "api";

var map = null;
var marker = null;
var customOverlay = null;

var ADDRESS = "";
var mapLat = 0;
var mapLng = 0;

const updateAddressLatLng = (address, lat, lng) => {
  mapLat = lat;
  mapLng = lng;
  ADDRESS = address;

  shopMap(address, lat, lng);
};

const shopMap = (address, lat, lng) => {
  const moveLatLon = new window.daum.maps.LatLng(lat, lng);
  marker.setPosition(moveLatLon);
  map.panTo(moveLatLon);

  customOverlay.setPosition(moveLatLon);
  customOverlay.setContent("<div class='mapAddress'>" + address + "</div>");
  map.relayout();
};

function searchDetailAddrFromCoords(coords, callback) {
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

const geocoder = new window.daum.maps.services.Geocoder();
const ps = new window.daum.maps.services.Places();

export default class AddressSettingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ADDRESS: props.address
    };
  }
  state = {};

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.ADDRESSDETAIL === nextState.ADDRESSDETAIL && this.state.ADDRESS === ADDRESS) return false;

    return true;
  };

  componentDidUpdate = () => this.setState({ ADDRESS: ADDRESS });

  componentDidMount = async () => {
    var container = document.getElementById("map");
    var options = {
      center: new window.daum.maps.LatLng(37.50374576425619, 127.04485358330714),
      level: 3
    };

    map = new window.daum.maps.Map(container, options);

    var imageSrc = "https://api.mubabot.com/static/public/img/icon-pin.png"; // 마커이미지의 주소입니다
    var imageSize = new window.daum.maps.Size(27, 30); // 마커이미지의 크기입니다
    var imageOption = { offset: new window.daum.maps.Point(13, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new window.daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    marker = new window.daum.maps.Marker({ image: markerImage });
    customOverlay = new window.daum.maps.CustomOverlay({});

    customOverlay.setMap(map);
    marker.setMap(map);
    map.relayout();

    window.daum.maps.event.addListener(map, "click", function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === window.daum.maps.services.Status.OK) {
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          map.panTo(mouseEvent.latLng);

          ADDRESS = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;

          updateAddressLatLng(ADDRESS, mouseEvent.latLng.jb, mouseEvent.latLng.ib);
        }
      });
    });

    ADDRESS = this.state.ADDRESS;

    geocoder.addressSearch(ADDRESS, function(result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        updateAddressLatLng(!!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name, result[0].y, result[0].x);
      } else {
        ps.keywordSearch(ADDRESS, function(result, status) {
          if (status === window.daum.maps.services.Status.OK) {
            updateAddressLatLng(!!result[0].road_address_name ? result[0].road_address_name : result[0].address_name, result[0].y, result[0].x);
          }
        });
      }
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSearch = e => (e.keyCode === 13 ? this.searchMap() : null);

  handleChangeOpen = OPEN => this.setState({ OPEN });
  handleChangeDelivery = DELIVERY => this.setState({ DELIVERY });

  searchMap = () => {
    const search = this.state.search;
    geocoder.addressSearch(search, function(result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        updateAddressLatLng(!!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name, result[0].y, result[0].x);
      } else {
        ps.keywordSearch(search, function(result, status) {
          if (status === window.daum.maps.services.Status.OK) {
            updateAddressLatLng(!!result[0].road_address_name ? result[0].road_address_name : result[0].address_name, result[0].y, result[0].x);
          }
        });
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (mapLat === 0 && mapLng === 0) return alert("주소를 선택해주세요.");

    BusinessApi.updateShopAddressLatLng({
      shop: this.props.service,
      address: ADDRESS,
      lat: mapLat,
      lng: mapLng
    })
      .then(res => this.props.closePopup())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Modal className="register" isOpen={this.props.modal} style={{ minWidth: 1050, maxWidth: 1050 }}>
        <ModalHeader toggle={this.props.toggle}>좌표 적용</ModalHeader>
        <ModalBody>
          <div>
            <div className="mapSearch">
              <input type="text" name="search" placeholder="주소 검색" onChange={this.onChange} onKeyDown={this.onSearch} />
              <button onClick={this.searchMap}>
                <SVG src={SearchIcon} />
              </button>
            </div>

            <div id="map" style={{ height: 280 }} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.onSubmit}>등록하기</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
