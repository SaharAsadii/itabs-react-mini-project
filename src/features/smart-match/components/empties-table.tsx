import { Forbidden2 } from "iconsax-react";
import React from "react";
import { formatDate } from "../../../utils/convert-date";
import { Booking, Container, EmptiesTableProps } from "../smart-match.types";

export const EmptiesTable: React.FC<EmptiesTableProps> = ({
  allContainers,
  allBookings,
  smartMatchEnabled,
  selectedMatchId,
  isMatched,
  getMatchId,
  handleItemClick,
}) => {
  return (
    <div className="col-span-7">
      <div className="column-container">
        {allContainers.map((container) => {
          const matchedBooking = allBookings.find((booking) =>
            isMatched(container, booking)
          );

          const matchId = matchedBooking
            ? getMatchId(container, matchedBooking)
            : `container-${container.id}`;

          const isSelected = selectedMatchId === matchId;

          const hasMatch = smartMatchEnabled
            ? hasSmartMatch(container, allBookings)
            : hasExistingMatch(container, matchedBooking);

          function hasSmartMatch(container: Container, bookings: Booking[]) {
            return bookings.some(
              (booking) => booking.suggested_container_id === container.id
            );
          }

          function hasExistingMatch(
            container: Container,
            matchedBooking: Booking | undefined
          ) {
            return !!matchedBooking || !!container.suggested_booking_id;
          }

          return (
            <div
              onClick={(e) => handleItemClick(e, matchId)}
              key={container.id}
              className={`grid-table-row table-inner-row tooltip-container ${
                isSelected || smartMatchEnabled
                  ? hasMatch
                    ? "matched"
                    : "unmatched"
                  : ""
              }`}
            >
              <div className="tooltip">
                {hasMatch && isSelected ? "unmatch" : "match"}
              </div>
              <div className="booking-value">{container.name}</div>

              <div className="booking-value">{container.chases}</div>

              <div className="booking-value">
                {container.gated_out ? formatDate(container.gated_out) : "-"}
              </div>

              <div className="booking-value">
                {container.gated_in ? formatDate(container.gated_in) : "-"}
              </div>

              <div className="booking-value">{container.return_terminals}</div>

              <div className="booking-value">Return Apt</div>

              <div className="booking-value">
                {container.est_per_diem ?? "-"}
              </div>
              {(smartMatchEnabled ? hasMatch : isSelected) && (
                <span className={`match-icon ${!hasMatch && "unmatched"}`}>
                  <Forbidden2 color="#fff" size={22} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
