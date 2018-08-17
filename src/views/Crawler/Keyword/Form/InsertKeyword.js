import React, { Component } from "react";
import { Button, FormGroup, Input, InputGroup, InputGroupAddon } from "reactstrap";

class InsertKeyword extends Component {
  render() {
    return (
      <FormGroup className="float-right">
        <InputGroup>
          <Input id="appendedInputButtons" size="16" type="text" />
          <InputGroupAddon addonType="append">
            <Button color="secondary">추가</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default InsertKeyword;
