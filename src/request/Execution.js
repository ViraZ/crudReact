import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Spinner from "react-spinner-material";
import dateFormat from "dateformat";

import Record from "./Record";
import JsonBinding from "../util/redux";

const styles = theme => ({
  card: {
    width: 500,
    border: "1px dotted grey"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatarError: {
    backgroundColor: red[300]
  },
  avatarSucceed: {
    backgroundColor: green[300]
  }
});

const headerStyle = theme => ({
  root: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    fontSize: "1em"
  },
  subheader: {
    fontSize: "0.8em"
  },
  action: {
    margin: 0
  }
});

class ExecutionSection extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const StyleCardHeader = withStyles(headerStyle)(CardHeader);
    return (
      <Paper className={classes.card} elevation={0}>
        <StyleCardHeader
          avatar={
            this.props.value.status === "running" ? (
              <Spinner size={20} spinnerColor={"#333"} spinnerWidth={2} />
            ) : (
              <Avatar aria-label="Recipe" className={classes.avatarSucceed}>
                {this.props.value.response.code}
              </Avatar>
            )
          }
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={dateFormat(
            new Date(this.props.value.timings.started),
            "mmmm dd, yyyy"
          )}
          subheader={"Triggered by " + this.props.value.trigger}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Divider />
          <Record value={this.props.value} />
        </Collapse>
      </Paper>
    );
  }
}

ExecutionSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecutionSection);
