// React imports
import React from "react";

// Module imports
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// Styles imports
import "./chat.scss";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function LoginTooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow className="tooltip-text" classes={classes} {...props} />
  );
}

export default LoginTooltip;
