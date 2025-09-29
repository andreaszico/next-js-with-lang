# Clean Architecture Implementation Summary

## Project Structure (Following Clean Architecture)

```
src/
├── domain/                 # Domain layer (business logic)
│   ├── entities/           # Business entities/models
│   │   ├── movie.ts
│   │   ├── showtime.ts
│   │   ├── user.ts
│   │   └── reservation.ts
│   ├── repositories/       # Repository interfaces
│   │   ├── movie.repository.ts
│   │   ├── showtime.repository.ts
│   │   └── reservation.repository.ts
│   └── usecases/           # Business use cases
│       ├── movie.usecase.ts
│       ├── showtime.usecase.ts
│       └── reservation.usecase.ts
├── domain/data/            # Data layer (data access)
│   ├── datasources/        # Data sources (API, DB, etc.)
│   │   ├── movie.datasource.ts
│   │   ├── showtime.datasource.ts
│   │   └── reservation.datasource.ts
│   └── repositories/       # Repository implementations
│       ├── movie.repository.impl.ts
│       ├── showtime.repository.impl.ts
│       └── reservation.repository.impl.ts
├── presentation/           # Presentation layer (UI logic)
│   ├── components/         # UI components
│   │   └── MovieList.tsx
│   └── viewmodels/         # View models/state management
│       ├── movie.viewmodel.ts
│       ├── showtime.viewmodel.ts
│       └── reservation.viewmodel.ts
├── container/              # Dependency injection
│   └── container.ts
├── shared/                 # Shared utilities
│   ├── services/           # Shared services
│   │   └── blog.service.ts
│   ├── utils/
│   ├── validation/
│   └── locale/
├── services/               # Legacy compatibility
│   └── blog.service.ts -> (redirects to shared/services/blog.service.ts)
├── lib/                    # Utility functions
├── hooks/                  # React hooks
├── components/             # UI components (shadcn/ui)
│   ├── custom/
│   └── ui/
├── app/                    # Next.js app router
│   ├── movies/             # Example movie feature
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── ...
```

## Clean Architecture Principles Implemented

1. **Separation of Concerns**: 
   - Domain layer contains business logic and entities
   - Data layer handles data access
   - Presentation layer manages UI and user interactions

2. **Dependency Inversion**:
   - Higher-level modules don't depend on lower-level modules
   - Both depend on abstractions (interfaces)

3. **Single Responsibility**:
   - Each class has a single reason to change
   - Each function performs a specific task

4. **Testability**:
   - Business logic is isolated from UI and data access
   - Easy to unit test each layer independently

## Key Features of the Implementation

- **Movie Reservation System**: Full domain with movies, showtimes, and reservations
- **Dependency Injection Container**: Centralized management of dependencies
- **React View Models**: Clean separation between business logic and UI logic
- **Repository Pattern**: Abstraction over data access
- **Use Cases**: Business logic encapsulation
- **Type Safety**: Full TypeScript support throughout

## How to Use

1. Use the container to get instances:
```typescript
import container from '@/container/container';

const movieRepo = container.getMovieRepository();
const { movies, loading, fetchMovies } = useMovieViewModel(movieRepo);
```

2. Components use view models that depend on repository interfaces:
```typescript
const MovieList = () => {
  const { movies, loading, error, fetchMovies } = useMovieViewModel(container.getMovieRepository());
  // ... render logic
};
```

This implementation provides a scalable, maintainable, and testable architecture for the movie reservation service.