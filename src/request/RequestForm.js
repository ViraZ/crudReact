import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Spinner from "react-spinner-material";
import Hostname from "./Hostname";
import Url from "./Url";
import Method from "./Method";
import Protocol from "./Protocol";
import { newExecution, setExecution } from "./data";
import JsonBinding from "../util/redux";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    margin: theme.spacing.unit,
    minWidth: "200px"
  },
  play: {
    float: "left"
  }
});

const gateway_server = "https://jsonplaceholder.typicode.com/users";
const gateway_url = "/gateway";

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { running: false };
  }

  getResponse = callback => {
    let props = this.props;
    let e = newExecution(props.value);
    props.insert(e, "$.executions");
    console.log("triggered");
    fetch(gateway_server + gateway_url, {
      method: "post"
      // body: JSON.stringify(props.value.request)
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        setExecution(e, data);
        props.updateArray(e, "$.executions");
        callback();
      });
  };

  click = event => {
    this.setState({ running: true });
    this.getResponse(() => {
      this.setState({ running: false });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.root}>
          <Method candidates={["GET", "POST", "PUT", "DELETE"]} />
          <Protocol candidates={["HTTP", "HTTPS"]} />
          <Hostname className={classes.input} />
          <Url className={classes.input} />
        </div>
        <div className={classes.play}>
          <Button color="primary" onClick={this.click}>
            {this.state.running ? (
              <Spinner size={20} spinnerColor={"#333"} spinnerWidth={2} />
            ) : (
              <Icon>play_arrow</Icon>
            )}
          </Button>
        </div>
      </div>
    );
  }
}

const binding = new JsonBinding("$");

const Request = withStyles(styles)(RequestForm);

export default binding.connect(Request);
