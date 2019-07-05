import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

import Icon from "@material-ui/core/Icon";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class KeyValue extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Key",
              accessor: "key",
              Cell: this.renderEditable
            },
            {
              Header: "Value",
              accessor: "value",
              Cell: this.renderEditable
            },
            {
              Header: "Description",
              id: "description",
              Cell: this.renderEditable
            },
            {
              Header: "Deletion",
              width: 65,
              Cell: row => <Icon>delete</Icon>,
              style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              }
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }
}

export default KeyValue;
