import React from "react";
import { Button } from "antd";
const SecondaryButton = ({
  children,
  className,
  height = 40,
  onClick = () => {},
}) => {
  return (
    <Button
      className={className ? className : ""}
      onClick={onClick}
      style={{ height: height, background: "#C2E6FF", color: "#3081D0" }}
      type="primary"
      size="large"
    >
      {children}
    </Button>
  );
};
export default SecondaryButton;
