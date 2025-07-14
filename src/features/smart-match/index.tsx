import { ExportSquare, Filter, Forbidden2, Truck } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { Badge, Button, Switch } from "../../components";
import api from "../../services/api";
import { ApiResponse } from "./smart-match.types";
import { formatDate } from "../../utils/convert-date";
import "./smart-match.styles.scss";

export const SmartMatch = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [smartMatchEnabled, setSmartMatchEnabled] = useState<boolean>(true);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApiResponse>("/inhouse")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="error">No data available</div>;

  const listData = Object.values(data.data.list);

  const isMatched = (container: any, booking: any) => {
    if (container.booking_id && container.booking_id === booking.id)
      return true;

    return (
      (container.suggested_booking_id &&
        container.suggested_booking_id === booking.id) ||
      (booking.suggested_container_id &&
        booking.suggested_container_id === container.id)
    );
  };

  const getSavings = (container: any, booking: any, exportItem: any) => {
    if (container.suggested_booking_saving)
      return container.suggested_booking_saving?.toFixed(2);
    if (booking.suggested_container_saving)
      return booking.suggested_container_saving;

    if (exportItem.savings)
      return (
        exportItem.savings[container.id] ||
        exportItem.savings[booking.id] ||
        "-"
      );

    return "-";
  };

  const getMatchId = (container: any, booking: any) => {
    if (isMatched(container, booking)) {
      return `match-${container.id}-${booking.id}`;
    }
    return null;
  };

  const handleItemClick = (e: React.MouseEvent, itemId: string | null) => {
    e.stopPropagation();
    if (itemId) {
      setSelectedMatchId(selectedMatchId === itemId ? null : itemId);
    }
  };

  return (
    <div className="smart-match-container">
      <div className="header">
        <div className="header-left">
          <div className="smart-match">
            <span>Smart Match</span>
            <Switch
              checked={smartMatchEnabled}
              onCheckedChange={setSmartMatchEnabled}
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

      <div className="table-wrapper">
        <div className="grid-table header-level-1">
          <div className="col-span-2">
            <Truck size={24} color="#000" variant="Bold" />
            <span>Lorem Ipsum</span>
          </div>
          <div className="col-span-7">
            <ExportSquare size={24} color="#000" variant="Bold" />
            <span>Your Empties</span>
          </div>
          <div className="col-span-7">
            <ExportSquare size={24} color="#000" variant="Bold" />
            <span>Your Exports</span>
          </div>
        </div>

        {/* Empties */}
        <div className="grid-table header-level-2">
          <div>#</div>
          <div>Size</div>
          <div>SSL</div>

          <div>Container</div>
          <div>Chasis</div>
          <div>Gated Out</div>
          <div>Gated In</div>
          <div>Return Terminal</div>
          <div>Return Apt</div>
          <div>Est. PerDiem</div>

          {/* Exports */}
          <div>Booking</div>
          <div>Loc</div>
          <div>Terminal Apt</div>
          <div>ERD</div>
          <div>Cut Off</div>
          <div>Pickup Loc</div>
          <div>Saving</div>
        </div>

        {listData.map((listItem, i) => {
          const rowId = `row-${listItem.size_type}-${listItem.cabin.company.name}-${i}`;

          const allContainers = listItem.empties.flatMap((empty) =>
            empty.containers.map((container) => ({ ...container, empty }))
          );
          const allBookings = listItem.exports.flatMap((exportItem) =>
            exportItem.bookings.map((booking) => ({ ...booking, exportItem }))
          );

          return (
            <div key={rowId} className="  " style={{ padding: "0.5rem 1rem" }}>
              <div className="grid-table data-row ">
                <div className={`col-span-2  `}>
                  <div className="grid-table table-inner-row ">
                    <div className="booking-value">{i + 1}</div>
                    <div className="booking-value">{listItem.size_type}</div>
                    <div className="booking-value">
                      {listItem.cabin.company.name}
                    </div>
                  </div>
                </div>
                {/* Empties columns  */}
                <div className={`col-span-7`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {allContainers.map((container) => {
                      const matchedBooking = allBookings.find((booking) =>
                        isMatched(container, booking)
                      );
                      const matchId = matchedBooking
                        ? getMatchId(container, matchedBooking)
                        : `container-${container.id}`;
                      const isSelected = selectedMatchId === matchId;

                      const hasMatch = smartMatchEnabled
                        ? allBookings.find(
                            (el) => el.suggested_container_id === container.id
                          )
                        : !!matchedBooking || !!container.suggested_booking_id;

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

                          <div className="booking-value">
                            {container.chases}
                          </div>

                          <div className="booking-value">
                            {formatDate(container.gated_out ?? "")}
                          </div>

                          <div className="booking-value">
                            {formatDate(container.last_free_day ?? "")}
                          </div>

                          <div className="booking-value">
                            {container.return_terminals}
                          </div>

                          <div className="booking-value">Return Apt</div>

                          <div className="booking-value">
                            {container.empty.address.city}
                          </div>
                          {(hasMatch || isSelected) && (
                            <span
                              className={`match-icon ${
                                !hasMatch && "unmatched"
                              }`}
                            >
                              <Forbidden2 color="#fff" size={22} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Exports columns  */}
                <div className="col-span-7">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {allBookings.length === 0
                      ? "-"
                      : allBookings.map((booking) => {
                          const matchedContainer = allContainers.find(
                            (container) => isMatched(container, booking)
                          );
                          const matchId = matchedContainer
                            ? getMatchId(matchedContainer, booking)
                            : `booking-${booking.id}`;

                          const isSelected = selectedMatchId === matchId;

                          const hasMatch = smartMatchEnabled
                            ? allContainers.find(
                                (el) => el.suggested_booking_id === booking.id
                              )
                            : !!matchedContainer ||
                              !!booking.suggested_container_id;

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
                                Booking: {booking.name} | Status:{" "}
                                {hasMatch ? "Matched" : "Available"} | Location:{" "}
                                {booking.exportItem.address.city} | ERD:{" "}
                                {formatDate(booking.load_pickup_date ?? "") ||
                                  "Not set"}
                              </div>
                              <div className="booking-value" key={booking.id}>
                                {booking.name}
                              </div>
                              <div className="booking-value">
                                {booking.exportItem.address.city}
                              </div>

                              <div className="booking-value">
                                {formatDate(booking.appointment ?? "") ?? "-"}
                              </div>

                              <div className="booking-value">
                                {formatDate(booking.load_pickup_date ?? "") ??
                                  "-"}
                              </div>

                              <div className="booking-value">
                                {formatDate(booking.vessel_departure ?? "") ??
                                  "-"}
                              </div>

                              <div className="booking-value">
                                {booking.exportItem.address.city}
                              </div>

                              <div className="booking-value">
                                <Badge
                                  variant={
                                    hasMatch && isSelected
                                      ? "matched"
                                      : "default"
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  $
                                  {(() => {
                                    if (matchedContainer) {
                                      return getSavings(
                                        matchedContainer,
                                        booking,
                                        booking.exportItem
                                      );
                                    }

                                    return (
                                      booking.exportItem.savings?.[
                                        booking.id
                                      ] || "-"
                                    );
                                  })()}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
