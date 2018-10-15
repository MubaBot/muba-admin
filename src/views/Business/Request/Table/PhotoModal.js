import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default class PhotoModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} style={{ minWidth: 700, maxWidth: 1000 }}>
        <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <img src={this.props.URL} style={{ maxWidth: "100%" }} alt="사업자 등록증" />
        </ModalBody>
      </Modal>
    );
  }
}
