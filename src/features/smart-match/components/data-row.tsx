import React from "react";
import { EmptiesTable, ExportsTable } from ".";
import {
  isMatched,
  getMatchId,
  getSavings,
  generateRowId,
  transformListData,
} from "../utils/smart-match-utils";
import { ListData } from "../smart-match.types";

interface DataRowProps {
  listItem: ListData;
  index: number;
  smartMatchEnabled: boolean;
  selectedMatchId: string | null;
  handleItemClick: (e: React.MouseEvent, itemId: string | null) => void;
}

export const DataRow: React.FC<DataRowProps> = ({
  listItem,
  index,
  smartMatchEnabled,
  selectedMatchId,
  handleItemClick,
}) => {
  const rowId = generateRowId(listItem, index);
  const { allContainers, allBookings } = transformListData(listItem);

  return (
    <div key={rowId} className="data-row-wrapper">
      <div className="grid-table data-row">
        <div className="col-span-2">
          <div className="grid-table table-inner-row">
            <div className="booking-value">{index + 1}</div>
            <div className="booking-value">{listItem.size_type}</div>
            <div className="booking-value">{listItem.cabin.company.name}</div>
          </div>
        </div>

        <EmptiesTable
          allContainers={allContainers}
          allBookings={allBookings}
          smartMatchEnabled={smartMatchEnabled}
          selectedMatchId={selectedMatchId}
          isMatched={isMatched}
          getMatchId={getMatchId}
          handleItemClick={handleItemClick}
        />

        <ExportsTable
          allBookings={allBookings}
          allContainers={allContainers}
          smartMatchEnabled={smartMatchEnabled}
          selectedMatchId={selectedMatchId}
          isMatched={isMatched}
          getMatchId={getMatchId}
          getSavings={getSavings}
          handleItemClick={handleItemClick}
        />
      </div>
    </div>
  );
};
