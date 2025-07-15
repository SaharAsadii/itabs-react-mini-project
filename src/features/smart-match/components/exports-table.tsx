import React from "react";
import { Badge } from "../../../components";
import { formatDate } from "../../../utils/convert-date";
import { Booking, Container, ExportsTableProps } from "../smart-match.types";
import { BadgeVariant } from "@/components/badge/badge.types";

export const ExportsTable: React.FC<ExportsTableProps> = ({
  allBookings,
  allContainers,
  smartMatchEnabled,
  selectedMatchId,
  isMatched,
  getMatchId,
  getSavings,
  handleItemClick,
}) => {
  return (
    <div className="col-span-7">
      <div className="column-container">
        {allBookings.length === 0
          ? "-"
          : allBookings.map((booking) => {
              const matchedContainer = allContainers.find((container) =>
                isMatched(container, booking)
              );

              const matchId = matchedContainer
                ? getMatchId(matchedContainer, booking)
                : `booking-${booking.id}`;

              const isSelected = selectedMatchId === matchId;

              const hasMatch = smartMatchEnabled
                ? hasSmartMatch(booking, allContainers)
                : hasExistingMatch(booking, matchedContainer);

              function hasSmartMatch(
                booking: Booking,
                containers: Container[]
              ) {
                return containers.some(
                  (container) => container.suggested_booking_id === booking.id
                );
              }

              function hasExistingMatch(
                booking: Booking,
                matchedContainer: Container | undefined
              ) {
                return !!matchedContainer || !!booking.suggested_container_id;
              }

              return (
                <div
                  className={`grid-table-row table-inner-row tooltip-container ${
                    isSelected || smartMatchEnabled
                      ? hasMatch
                        ? "matched"
                        : "unmatched"
                      : ""
                  }`}
                  onClick={(e) => handleItemClick(e, matchId)}
                >
                  <div className="tooltip">
                    {hasMatch && isSelected ? "unmatch" : "match"}
                  </div>
                  <div className="booking-value" key={booking.id}>
                    {booking.name}
                  </div>
                  <div className="booking-value">
                    {booking.exportItem.address.city}
                  </div>

                  <div className="booking-value">Terminal Apt</div>

                  <div className="booking-value">{booking.erd ?? "-"}</div>

                  <div className="booking-value">
                    {formatDate(booking.load_pickup_date ?? "") ?? "-"}
                  </div>

                  <div className="booking-value">
                    {booking.pick_up_location ?? "-"}
                  </div>

                  <div className="booking-value">
                    <Badge
                      variant={
                        hasMatch && isSelected
                          ? BadgeVariant.MATCHED
                          : BadgeVariant.DEFAULT
                      }
                      onClick={(e) => e.stopPropagation()}
                    >
                      $
                      {matchedContainer
                        ? getSavings(
                            matchedContainer as Container,
                            booking,
                            booking.exportItem
                          )
                        : "-"}
                    </Badge>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
