import { NextRequest } from 'next/server';

// Define the Movie type
type Movie = {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  rating: number;
  duration: number; // Duration in minutes
  poster: string;
  description: string;
};

// Dummy movie data
const dummyMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    rating: 8.8,
    duration: 148,
    poster: 'https://via.placeholder.com/300x450/0000FF/808080?text=Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: ['Drama'],
    rating: 9.3,
    duration: 142,
    poster: 'https://via.placeholder.com/300x450/0000FF/808080?text=Shawshank',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    duration: 152,
    poster: 'https://via.placeholder.com/300x450/0000FF/808080?text=Dark+Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    genre: ['Crime', 'Drama'],
    rating: 8.9,
    duration: 154,
    poster: 'https://via.placeholder.com/300x450/0000FF/808080?text=Pulp+Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
  },
  {
    id: 5,
    title: 'Forrest Gump',
    year: 1994,
    director: 'Robert Zemeckis',
    genre: ['Drama', 'Romance'],
    rating: 8.8,
    duration: 142,
    poster: 'https://via.placeholder.com/300x450/0000FF/808080?text=Forrest+Gump',
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.'
  }
];

// GET request handler
export async function GET(request: NextRequest) {
  // Get search parameters
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const genre = searchParams.get('genre');
  
  // Filter movies based on query parameters
  let filteredMovies = [...dummyMovies];
  
  if (id) {
    const movie = dummyMovies.find(movie => movie.id === parseInt(id, 10));
    if (!movie) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (genre) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())
    );
  }
  
  return new Response(JSON.stringify(filteredMovies), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// POST request handler to add a new movie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.year || !body.director) {
      return new Response(JSON.stringify({ error: 'Title, year, and director are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create new movie object
    const newMovie: Movie = {
      id: Math.max(...dummyMovies.map(m => m.id)) + 1, // Simple ID generation
      title: body.title,
      year: body.year,
      director: body.director,
      genre: body.genre || [],
      rating: body.rating || 0,
      duration: body.duration || 120, // Default duration of 120 minutes
      poster: body.poster || `https://via.placeholder.com/300x450/0000FF/808080?text=${encodeURIComponent(body.title)}`,
      description: body.description || ''
    };
    
    // Add to dummy data (in a real app, this would save to a database)
    dummyMovies.push(newMovie);
    
    return new Response(JSON.stringify(newMovie), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}