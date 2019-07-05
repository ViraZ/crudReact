import React from "react";
import KeyValue from "./KeyValue";
import Body from "./Body";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8",
    minHeight: "36px"
  },
  tabRoot: {
    textColor: "grey",
    fontSize: "10px",
    "&:hover": {
      color: "#494949",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#494949",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#494949"
    },
    minHeight: "36px"
  },
  tabsIndicator: {
    backgroundColor: "#494949"
  },
  tabSelected: {},
  tabcontainer: {
    padding: 0
  }
});

class ReqParam extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            label="Params"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          />
          <Tab
            label="Headers"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          />
          <Tab
            label="Body"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          />
        </Tabs>
        {value === 0 && (
          <div className={classes.tabcontainer}>
            <KeyValue key="0" />
          </div>
        )}
        {value === 1 && (
          <div className={classes.tabcontainer}>
            <KeyValue key="1" />
          </div>
        )}
        {value === 2 && (
          <div className={classes.tabcontainer}>
            <Body />
          </div>
        )}
      </div>
    );
  }
}

ReqParam.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReqParam);
