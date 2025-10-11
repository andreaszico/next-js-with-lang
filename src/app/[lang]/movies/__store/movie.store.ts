import { create } from "zustand";
import { createMovieReservationSlice, MovieReservationSlice } from "./slices/reservation.slice";
import { createMovieSlice, MovieSlice } from "./slices/movie.slice";
import { createTheaterSlice, TheaterSlice } from "./slices/theater.slice";

export type Store = MovieReservationSlice & MovieSlice & TheaterSlice;

export const useMovieStore = create<Store>()(
    (...a) => ({
    ...createMovieReservationSlice(...a),
    ...createMovieSlice(...a),
    ...createTheaterSlice(...a),
    })
);