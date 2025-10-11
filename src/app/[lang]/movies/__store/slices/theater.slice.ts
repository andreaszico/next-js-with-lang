import { StateCreator } from 'zustand';

export type TheaterSliceState = {
    theaters: Record<number, {
        name: string;
        location: string;
        capacity: number;
    }>;
    theaterErrors: Record<number, string>;
};

export type TheaterSliceActions = {
    addTheater: (theaterData: { name: string; location: string; capacity: number }) => void;
    removeTheater: (id: number) => void;
};

export type TheaterSlice = TheaterSliceState & TheaterSliceActions;

export const createTheaterSlice: StateCreator<
    TheaterSliceState,
    [],
    [],
    TheaterSlice
> = (set, get) => ({
    theaters: {},
    theaterErrors: {},

    addTheater: (theaterData) => {
        const nextId = Object.keys(get().theaters).length + 1;
        set((state) => ({
            theaters: {
                ...state.theaters,
                [nextId]: theaterData,
            },
        }));
    },

    removeTheater: (id) => {
        set((state) => {
            const { [id]: _, ...restTheaters } = state.theaters;
            return {
                theaters: restTheaters,
            };
        });
    },
});