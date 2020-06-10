// SRC: https://material-ui.com/components/tooltips/#arrow-tooltips

// React imports
import React from "react";

// Module imports
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// Styles imports
import "./chat.scss";

// Material UI example code
// Added whiteSpace line to format multi-line text
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    whiteSpace: "pre-line",
  },
}));

// Material UI example code
function ChatTooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow className="tooltip-text" classes={classes} {...props} />
  );
}

export default ChatTooltip;
