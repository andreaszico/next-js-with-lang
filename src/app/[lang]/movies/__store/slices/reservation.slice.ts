import { StateCreator } from 'zustand';

export type MovieReservationSliceState = {
    reservations: Record<number, {
        movieTitle: string;
        showtime: string;
        seatNumber: string;
    }>;
    reservationErrors: Record<number, string>;
};

export type MovieReservationSliceActions = {
    addReservation: (reservationData: { movieTitle: string; showtime: string; seatNumber: string }) => void;
    removeReservation: (id: number) => void;
};

export type MovieReservationSlice = 
    MovieReservationSliceState & MovieReservationSliceActions;

export const createMovieReservationSlice: StateCreator<
    MovieReservationSliceState,
    [],
    [],
    MovieReservationSlice
> = (set, get) => ({
    reservations: {},
    reservationErrors: {},

    addReservation: (reservationData) => {
        const nextId = Object.keys(get().reservations).length + 1;
        set((state) => ({
            reservations: {
                ...state.reservations,
                [nextId]: reservationData,
            },
        }));
    },

    removeReservation: (id) => {
        set((state) => {
            const { [id]: _, ...restReservations } = state.reservations;
            return {
                reservations: restReservations,
            };
        });
    },
});