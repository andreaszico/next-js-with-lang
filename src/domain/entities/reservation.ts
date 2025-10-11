import { User } from './user';
import { Showtime } from './showtime';

export interface Reservation {
  id: string;
  userId: string;
  user: User;
  showtimeId: string;
  showtime: Showtime;
  seatNumbers: string[]; // e.g., ['A1', 'A2', 'A3']
  reservationDate: Date;
  status: 'confirmed' | 'cancelled' | 'pending';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationFilters {
  userId?: string;
  showtimeId?: string;
  status?: 'confirmed' | 'cancelled' | 'pending';
  dateFrom?: Date;
  dateTo?: Date;
}