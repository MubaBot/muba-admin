import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from "reactstrap";

export default class UpdateChatbotModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader>
          {this.props.now} / {this.props.count}개 진행중
        </ModalHeader>

        <ModalBody>
          <Progress animated value={(this.props.now / this.props.count) * 100} />
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
