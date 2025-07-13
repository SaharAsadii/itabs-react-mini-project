import { Export, Filter, Truck } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { Button, Switch } from "../../components";
import api from "../../services/api";
import { ApiResponse, ListData } from "./smart-match.types";
import { formatDate } from "../../utils/convert-date";
import "./smart-match.styles.scss";

export const SmartMatch = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [smartMatchEnabled, setSmartMatchEnabled] = useState<boolean>(true);

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

  function findBooking(exports: ListData["exports"], bookingId?: number) {
    for (const ex of exports) {
      const found = ex.bookings.find((b) => b.id === bookingId);
      if (found) return found;
    }
    return null;
  }
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

      <div className="main-content">
        <div className="table-wrapper">
          <div className="grid-table header-level-1">
            <div className="col-span-2">
              {" "}
              <Truck size={24} color="#000" variant="Bold" />
              <span>Lorem Ipsum</span>
            </div>
            <div className="col-span-7">
              {" "}
              <Export size={24} color="#000" />
              <span>Your Empties</span>
            </div>
            <div className="col-span-6">
              {" "}
              <Export size={24} color="#000" />
              <span>Your Exports</span>
            </div>
          </div>

          {/* Empties */}
          <div className="grid-table header-level-2">
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

          {listData.map((listData, i) => {
            return (
              <React.Fragment key={i}>
                {listData.empties.map((empty) =>
                  empty.containers.map((container) => {
                    const matchedBooking = findBooking(
                      listData.exports,
                      container.booking_id
                    );
                    return (
                      <div className="grid-table data-row" key={container.id}>
                        <div>{listData.size_type}</div>
                        <div>{listData.cabin.company.name}</div>

                        <div>{container.name}</div>
                        <div>{container.chases}</div>
                        <div>{formatDate(container.gated_out ?? "")}</div>
                        <div>{formatDate(container.last_free_day ?? "")}</div>
                        <div>{container.return_terminals}</div>
                        <div>Return Apt</div>
                        <div>{empty.address.city}</div>

                        <div>{matchedBooking?.name ?? "-"}</div>
                        <div>{empty.address.city}</div>
                        <div>{matchedBooking?.appointment ?? "-"}</div>
                        <div>{matchedBooking?.load_pickup_date ?? "-"}</div>
                        <div>{matchedBooking?.vessel_departure ?? "-"}</div>
                        <div>{empty.address.city}</div>

                        <div>${container.suggested_booking_saving ?? "-"}</div>
                      </div>
                    );
                  })
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
