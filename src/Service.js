import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import TestCase from "./request/TestCase";
import { createStore } from "redux";
import { reducer } from "./util/redux";
import cases from "./request/data";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  section: {
    borderLeft: "5px solid red"
  }
});

class Service extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {cases.item.map((item, i) => {
          let store = createStore(reducer(item));
          return (
            <Provider store={store} key={i}>
              <TestCase />
            </Provider>
          );
        })}
      </div>
    );
  }
}

Service.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Service);
