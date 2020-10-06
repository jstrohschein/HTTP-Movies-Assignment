import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'

function MovieList({ movies }) {

  const { push } = useHistory();

  return (
    <div className="movie-list">
      <Button color='primary' onClick={() => push('/add-movie')} className='button'>Add Movie</Button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
