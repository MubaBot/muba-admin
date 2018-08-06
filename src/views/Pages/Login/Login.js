import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { login, existAdminUser } from 'api/pages/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: '' };

    existAdminUser().then(result => {
      if (result.data.exist === false)
        this.props.history.push('/register');
    });
  }

  onChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  onSubmit = (e) => {
    e.preventDefault();
    login(this.state).then(result => {
      this.props.history.push('/dashboard')
    }).catch((e) => {
      console.log(e);
      const code = e.response.data.success;
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-info py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="d-flex align-items-center justify-content-center text-center">
                    <div>
                      <h2>SNS</h2>
                      <p>SNS계정을 이용하여 로그인합니다.</p>
                      <Button color="danger" className="mt-3" active>Google</Button>{' '}
                      <Button color="primary" className="mt-3" active>Facebook</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
