"use client";

import * as React from "react";
import "./switch.scss";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className = "",
      checked = false,
      onCheckedChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        className={`switch ${checked ? "switch--checked" : ""} ${
          disabled ? "switch--disabled" : ""
        } ${className}`.trim()}
        onClick={handleClick}
        disabled={disabled}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        {...props}
      >
        <span className="switch__thumb" />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
