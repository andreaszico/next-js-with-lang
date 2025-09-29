import { Movie } from './movie';

export interface Showtime {
  id: string;
  movieId: string;
  movie: Movie;
  theaterId: string;
  theaterName: string;
  startTime: Date;
  endTime: Date;
  availableSeats: number;
  totalSeats: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}