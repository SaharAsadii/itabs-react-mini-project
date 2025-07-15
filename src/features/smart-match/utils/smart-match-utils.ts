import {
  Container,
  Booking,
  Export,
  ListData,
  Empty,
} from "../smart-match.types";

export const isMatched = (container: Container, booking: Booking): boolean => {
  if (container.booking_id && container.booking_id === booking.id) {
    return true;
  }

  return !!(
    (container.suggested_booking_id &&
      container.suggested_booking_id === booking.id) ||
    (booking.suggested_container_id &&
      booking.suggested_container_id === container.id)
  );
};

export const getMatchId = (
  container: Container,
  booking: Booking
): string | null => {
  if (isMatched(container, booking)) {
    return `match-${container.id}-${booking.id}`;
  }
  return null;
};

export const getSavings = (
  container: Container,
  booking: Booking,
  exportItem: Export
) => {
  if (container.suggested_booking_saving) {
    return container.suggested_booking_saving.toFixed(2);
  }

  if (booking.suggested_container_saving) {
    return booking.suggested_container_saving.toString();
  }

  if (exportItem.savings)
    return (
      exportItem.savings[container.id] || exportItem.savings[booking.id] || "-"
    );

  return "-";
};

export const generateRowId = (listItem: ListData, index: number): string => {
  return `row-${listItem.size_type}-${listItem.cabin.company.name}-${index}`;
};

export const transformListData = (listItem: ListData) => {
  const allContainers = listItem.empties.flatMap((empty: Empty) =>
    empty.containers.map((container: Container) => ({ ...container, empty }))
  );

  const allBookings = listItem.exports.flatMap((exportItem: Export) =>
    exportItem.bookings.map((booking: Booking) => ({ ...booking, exportItem }))
  );

  return { allContainers, allBookings };
};
