import * as React from "react";
import "./button.scss";
import { ButtonProps } from "./button.types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

    return <button className={classes} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };
