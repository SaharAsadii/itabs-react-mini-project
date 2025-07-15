import "./badge.scss";
import { DiscountShape } from "iconsax-react";
import { BadgeProps, BadgeVariant } from "./badge.types";

function Badge({
  className = "",
  variant = BadgeVariant.DEFAULT,
  ...props
}: BadgeProps) {
  return (
    <div className={`badge badge--${variant} ${className}`.trim()} {...props}>
      <DiscountShape size={18} color="#fff" />
      {props.children}
    </div>
  );
}

export { Badge };
