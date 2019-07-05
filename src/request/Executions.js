import React from "react";
import JsonBinding from "../util/redux";
import Execution from "./Execution";

class ExecutionsSection extends React.Component {
  render() {
    let ret = this.props.value.map((item, i) => {
      return (
        <div key={i}>
          <Execution value={item} />
          <br />
        </div>
      );
    });
    return ret;
  }
}

let binding = new JsonBinding("$.executions");

const Executions = binding.connect(ExecutionsSection);

export default Executions;
