export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl?: string;
  genre: string[];
  duration: number; // in minutes
  releaseDate: Date;
  rating: string; // e.g., PG, PG-13, R
  director?: string;
  cast?: string[];
  trailerUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieFilters {
  genre?: string;
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
}