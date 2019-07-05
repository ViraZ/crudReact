import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import JsonBinding from "../util/redux";
import { formatUrl, formatResponseBody } from "./data";

const tabStyles = theme => ({
  root: {
    fontSize: "0.5em",
    minHeight: "3em"
  },
  labelContainer: {
    margin: 0,
    padding: 0
  }
});

const StyledTab = withStyles(tabStyles)(Tab);

const tabsStyles = theme => ({
  root: {}
});

const StyledTabs = withStyles(tabsStyles)(Tabs);
class RecordSection extends React.Component {
  state = { value: "request" };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <StyledTabs
          fullWidth
          onChange={this.handleChange}
          value={this.state.value}
          indicatorColor="primary"
        >
          <StyledTab label="Request" value="request" />
          {this.props.value.status === "running" ? (
            ""
          ) : (
            <StyledTab label="Response" value="response" />
          )}
          }
        </StyledTabs>
        {this.state.value === "request" && (
          <div>
            <Typography>
              {this.props.value.request.method}{" "}
              {formatUrl(this.props.value.request)}
            </Typography>
            <Typography>Header:</Typography>
            {this.props.value.request.header.map((item, i) => {
              return (
                <Typography key={i}>
                  {item.key}:{item.value}
                </Typography>
              );
            })}

            <Typography>Body:</Typography>
            <Typography>{this.props.value.request.body.raw}</Typography>
          </div>
        )}
        {this.state.value === "response" && (
          <div>
            <Typography>Header:</Typography>
            {this.props.value.response.header.map((item, i) => {
              return (
                <Typography key={i}>
                  {item.key}:{item.value}
                </Typography>
              );
            })}
            <Typography>Body:</Typography>
            <Typography>
              {formatResponseBody(this.props.value.response)}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}
export default RecordSection;
