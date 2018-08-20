/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { Button, TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
// import renderHTML from "react-render-html";

import { getContentById } from "api/axios/crawler/contents";

const switchText = ["원래대로", "HTML 코드"];

class ContentView extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { received: false, modal: false, worker: [], activeTab: true };
  }

  toggle = e => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };

  toggle = e => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };

  changeHTML = e => this.setState({ activeTab: !this.state.activeTab });

  componentWillUpdate = (props, state) => {
    if (state.modal && !state.received)
      return getContentById({ id: this.props.id })
        .then(result =>
          this.setState({
            received: true,
            content: result.data.content,
            comment: result.data.comment
          })
        )
        .catch(err => {});
  };

  render() {
    return (
      <div>
        <a onClick={this.toggle} href="">
          {this.props.url}
        </a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} style={{ maxWidth: "80%" }}>
          <ModalHeader toggle={this.toggle}>
            {this.props.title} (
            <a href={this.props.url} target="_blank">
              Link
            </a>
            )
          </ModalHeader>
          <ModalBody>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={true}>
                <Row>
                  <Col sm="12" dangerouslySetInnerHTML={{ __html: this.state.content }} />
                </Row>
              </TabPane>
              <TabPane tabId={false}>
                <Row>
                  <Col sm="12">{this.state.content}</Col>
                </Row>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.changeHTML}>
              {switchText[this.state.activeTab ? 1 : 0]}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ContentView;
