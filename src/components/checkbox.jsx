import React from "react";
// import styled from 'styled-components'
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      checked: !!this.props.initialState,
    };
    // Hide checkbox visually but remain accessible to screen readers.
    // Source: https://polished.js.org/docs/#hidevisually
    this.HiddenCheckbox_style = {
      border: "0",
      clip: "rect(0 0 0 0)",
      clippath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    };
    this.CheckboxContainer_style = {
      display: "inline-block",
      verticalAlign: "middle",
    };
    this.Icon_style = {
      fill: "none",
      strokeWidth: "2px",
    };
    this.StyledCheckbox_style = {
      display: "inline-block",
      width: "16px",
      height: "16px",
      borderRadius: "3px",
      transition: "all 150ms",
    };
  }
  onBlur() {
    this.setState({ focused: false });
  }
  onFocus() {
    this.setState({ focused: true });
  }
  onStateChange(event) {
    // console.log((event.target.checked)?'checked':'un-checked')
    this.props.onStateChange && this.props.onStateChange(event.target.checked);
    this.setState({ checked: event.target.checked });
  }
  render() {
    let focusBorderColor = this.props.focusBorderColor || "pink";
    let backgroundWhenChecked = this.props.backgroundWhenChecked || "salmon";
    let backgroundWhenNotChecked =
      this.props.backgroundWhenNotChecked || "papayawhip";
    return (
      <label>
        <div // CheckboxContainer
          style={this.CheckboxContainer_style}
          className={this.props.className}
        >
          <input // HiddenCheckbox
            type="checkbox"
            checked={this.state.checked}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onStateChange.bind(this)}
            style={this.HiddenCheckbox_style}
          />
          <div // StyledCheckbox
            checked={this.state.checked}
            style={{
              ...this.StyledCheckbox_style,
              boxShadow: this.state.focused
                ? "0 0 0 3px " + focusBorderColor
                : "",
              background: this.state.checked
                ? backgroundWhenChecked
                : backgroundWhenNotChecked,
            }}
          >
            <svg // Icon
              viewBox="0 0 24 24"
              style={{
                ...this.Icon_style,
                stroke: this.props.v_color || "white",
                visibility: this.state.checked ? "visible" : "hidden",
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <span style={{ marginLeft: 8 }}>
          {this.props.label || "Label Text"}
        </span>
      </label>
    );
  }
}
export default Checkbox;
