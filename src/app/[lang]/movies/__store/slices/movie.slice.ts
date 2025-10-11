import { StateCreator } from 'zustand';

export type MovieSliceState = {
    movies: Array<{
        title: string;
        duration: number; // Duration in minutes
        genre: string;
    }>;
    movieErrors: Record<number, string>;
};

export type MovieSliceActions = {
    addMovie: (movieData: { title: string; duration: number; genre: string }) => void;
    removeMovie: (id: number) => void;
};

export type MovieSlice = MovieSliceState & MovieSliceActions;

export const createMovieSlice: StateCreator<
    MovieSliceState,
    [],
    [],
    MovieSlice
> = (set, get) => ({
    movies: [
        { title: "Inception", duration: 148, genre: "Sci-Fi" },
        { title: "The Dark Knight", duration: 152, genre: "Action" },
        { title: "Interstellar", duration: 169, genre: "Sci-Fi" },
        { title: "Parasite", duration: 132, genre: "Thriller" },
        { title: "The Godfather", duration: 175, genre: "Crime" },
    ],
    movieErrors: {},

    addMovie: (movieData) => {
        set((state) => ({
            movies: [...state.movies, { ...movieData }],
        }));
    },

    removeMovie: (id) => {
        set((state) => {
            const { [id]: _, ...restMovies } = state.movies;
            return {
                movies: restMovies,
            };
        });
    },
});