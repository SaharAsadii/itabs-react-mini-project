import { HTMLAttributes } from "react";

export enum BadgeVariant {
  DEFAULT = "default",
  MATCHED = "matched",
  UNMATCHED = "unmatched",
}

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}
