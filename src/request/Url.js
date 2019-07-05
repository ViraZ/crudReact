import React from "react";
import JsonBinding from "../util/redux";
import Input from "@material-ui/core/Input";

let binding = new JsonBinding("$.request.url.path");

class UrlInput extends React.Component {
  render() {
    let onChange = e => this.props.update(e.target.value.split("/").slice(1));
    return (
      <Input
        fullWidth
        defaultValue={"/" + this.props.value.join("/")}
        onChange={onChange}
      />
    );
  }
}

const Url = binding.connect(UrlInput);

export default Url;
