import React, { Children } from "react";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: radial-gradient(#54a0ff, #3081d0);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
const GradientButton = ({
  children,
  className,
  height = 40,
  onClick = () => {},
}) => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        className={className ? className : ""}
        onClick={onClick}
        style={{ height: height }}
        type="primary"
        size="large"
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
export default GradientButton;
