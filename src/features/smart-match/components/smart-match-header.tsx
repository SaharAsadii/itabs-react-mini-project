import React from "react";
import { Filter } from "iconsax-react";
import { Button, Switch } from "@/components";

interface SmartMatchHeaderProps {
  smartMatchEnabled: boolean;
  onSmartMatchToggle: (enabled: boolean) => void;
}

export const SmartMatchHeader: React.FC<SmartMatchHeaderProps> = ({
  smartMatchEnabled,
  onSmartMatchToggle,
}) => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="smart-match">
          <span>Smart Match</span>
          <Switch
            checked={smartMatchEnabled}
            onCheckedChange={onSmartMatchToggle}
          />
        </div>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="header-right">
        <Button variant="outline" className="filter-btn bg-transparent">
          <Filter variant="Bold" size={24} color="#333" /> Filter
        </Button>
      </div>
    </div>
  );
};
