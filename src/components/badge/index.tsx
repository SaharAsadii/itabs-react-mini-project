import type * as React from "react";
import "./badge.scss";
import { DiscountShape } from "iconsax-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "matched" | "unmatched";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <div className={`badge badge--${variant} ${className}`.trim()} {...props}>
      <DiscountShape size={18} color="#fff" />
      {props.children}
    </div>
  );
}

export { Badge };
