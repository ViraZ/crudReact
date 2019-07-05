import React from "react";
import Input from "@material-ui/core/Input";
import JsonBinding from "../util/redux";

let binding = new JsonBinding("$.request.url.host");

class HostnameInput extends React.Component {
  render() {
    return (
      <Input
        disabled
        defaultValue={this.props.value.join(".")}
        onChange={e => this.props.update(e.target.value.split("."))}
        style={{ minWidth: "12em" }}
      />
    );
  }
}

const Hostname = binding.connect(HostnameInput);

export default Hostname;
