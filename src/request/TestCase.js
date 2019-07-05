import React from "react";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RequestForm from "./RequestForm";
import Executions from "./Executions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "65%"
  },
  section: {
    borderLeft: "5px solid red"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  column: {
    flexBasis: "50%"
  }
});

const mapStateToProps = store => ({
  method: store.request.method,
  url:
    store.request.url.protocol.toLowerCase() +
    "://" +
    store.request.url.host.join(".") +
    "/" +
    store.request.url.path.join("/"),
  id: store.id,
  executions: store.executions
});

class TestCaseSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanel
        key={classes.id}
        className={classes.section}
        defaultExpanded={true}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {this.props.method}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {this.props.url}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            <RequestForm />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.column}>
                <Chip
                  label="UserID"
                  className={classes.chip}
                  onDelete={() => {}}
                />
              </div>
              <div className={classes.helper}>
                <Typography variant="caption">
                  Result
                  <br />
                  <Executions />
                </Typography>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>

        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}
const TestCase = withStyles(styles)(TestCaseSection);

export default connect(
  mapStateToProps,
  null
)(TestCase);
