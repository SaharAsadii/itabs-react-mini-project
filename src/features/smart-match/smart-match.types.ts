export interface Container {
  empty: any;
  id: number;
  name: string;
  chases: string;
  suggested_booking_id?: number;
  suggested_booking_saving?: number;
  booking_id?: number;
  status: number;
  status_message?: string;
  last_free_day?: string;
  gated_out?: string;
  gated_in?: string;
  est_per_diem?: string;
  return_terminals: string;
  savings?: Record<string, string>;
}

export interface Address {
  id: number;
  address: string;
  city: string;
  lat: number;
  long: number;
}

export interface Company {
  id: number;
  name: string;
  alias: string;
}

export interface Specifications {
  id: number;
  size: number;
  name: string;
  model: string;
  size_type: string;
}

export interface Cabin {
  id: number;
  company: Company;
  specifications: Specifications;
}

export interface Empty {
  id: number;
  cabin_id: number;
  address_id: number;
  count: number;
  count_available: number;
  own_available: number;
  pool_available: number;
  containers: Container[];
  address: Address;
  cabin: Cabin;
}

export interface Booking {
  exportItem: any;
  id: number;
  name: string;
  export_id: number;
  suggested_container_id?: number;
  suggested_container_saving?: number;
  container_id?: number;
  status: number;
  appointment?: string;
  load_pickup_date?: string;
  vessel_departure?: string;
  erd?: string;
  pick_up_location?: string;
}

export interface Export {
  id: number;
  cabin_id: number;
  address_id: number;
  count: number;
  count_filled: number;
  bookings: Booking[];
  address: Address;
  cabin: Cabin;
  savings?: Record<string, number>;
}

export interface ListData {
  cabin: Cabin;
  size_type: string;
  company_name: string;
  empties: Empty[];
  exports: Export[];
  containers_count: number;
  exports_count: number;
}

export interface ApiResponse {
  message: string;
  data: {
    list: Record<string, ListData>;
  };
}

export interface BaseTableProps {
  allContainers: Container[];
  allBookings: Booking[];
  smartMatchEnabled: boolean;
  selectedMatchId: string | null;
  isMatched: (container: Container, booking: Booking) => boolean;
  getMatchId: (container: Container, booking: Booking) => string | null;
  handleItemClick: (e: React.MouseEvent, itemId: string | null) => void;
}

export type EmptiesTableProps = BaseTableProps;

export interface ExportsTableProps extends BaseTableProps {
  getSavings: (
    container: Container,
    booking: Booking,
    exportItem: Export
  ) => number | string;
}
