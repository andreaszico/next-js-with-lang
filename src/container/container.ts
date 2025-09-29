import { MovieRemoteDataSource } from '@/domain/data/datasources/movie.datasource';
import { ShowtimeRemoteDataSource } from '@/domain/data/datasources/showtime.datasource';
import { ReservationRemoteDataSource } from '@/domain/data/datasources/reservation.datasource';
import { MovieRepository } from '@/domain/data/repositories/movie.repository.impl';
import { ShowtimeRepository } from '@/domain/data/repositories/showtime.repository.impl';
import { ReservationRepository } from '@/domain/data/repositories/reservation.repository.impl';
import { IMovieRepository } from '@/domain/repositories/movie.repository';
import { IShowtimeRepository } from '@/domain/repositories/showtime.repository';
import { IReservationRepository } from '@/domain/repositories/reservation.repository';
import { IMovieRemoteDataSource } from '@/domain/data/datasources/movie.datasource';
import { IShowtimeRemoteDataSource } from '@/domain/data/datasources/showtime.datasource';
import { IReservationRemoteDataSource } from '@/domain/data/datasources/reservation.datasource';

export interface IContainer {
  // Data Sources
  getMovieRemoteDataSource(): IMovieRemoteDataSource;
  getShowtimeRemoteDataSource(): IShowtimeRemoteDataSource;
  getReservationRemoteDataSource(): IReservationRemoteDataSource;

  // Repositories
  getMovieRepository(): IMovieRepository;
  getShowtimeRepository(): IShowtimeRepository;
  getReservationRepository(): IReservationRepository;
}

export class Container implements IContainer {
  private _movieRemoteDataSource?: IMovieRemoteDataSource;
  private _showtimeRemoteDataSource?: IShowtimeRemoteDataSource;
  private _reservationRemoteDataSource?: IReservationRemoteDataSource;

  private _movieRepository?: IMovieRepository;
  private _showtimeRepository?: IShowtimeRepository;
  private _reservationRepository?: IReservationRepository;

  // Data Sources
  getMovieRemoteDataSource(): IMovieRemoteDataSource {
    if (!this._movieRemoteDataSource) {
      this._movieRemoteDataSource = new MovieRemoteDataSource();
    }
    return this._movieRemoteDataSource;
  }

  getShowtimeRemoteDataSource(): IShowtimeRemoteDataSource {
    if (!this._showtimeRemoteDataSource) {
      this._showtimeRemoteDataSource = new ShowtimeRemoteDataSource();
    }
    return this._showtimeRemoteDataSource;
  }

  getReservationRemoteDataSource(): IReservationRemoteDataSource {
    if (!this._reservationRemoteDataSource) {
      this._reservationRemoteDataSource = new ReservationRemoteDataSource();
    }
    return this._reservationRemoteDataSource;
  }

  // Repositories
  getMovieRepository(): IMovieRepository {
    if (!this._movieRepository) {
      this._movieRepository = new MovieRepository(this.getMovieRemoteDataSource());
    }
    return this._movieRepository;
  }

  getShowtimeRepository(): IShowtimeRepository {
    if (!this._showtimeRepository) {
      this._showtimeRepository = new ShowtimeRepository(this.getShowtimeRemoteDataSource());
    }
    return this._showtimeRepository;
  }

  getReservationRepository(): IReservationRepository {
    if (!this._reservationRepository) {
      this._reservationRepository = new ReservationRepository(this.getReservationRemoteDataSource());
    }
    return this._reservationRepository;
  }
}

// Singleton instance
const container = new Container();
export default container;