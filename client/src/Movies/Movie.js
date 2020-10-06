import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

const Movie = props => {
  
  const [movie, setMovie] = useState(null);
  const { push } = useHistory();
  const { id } = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const handleDelete = e => {

    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('MovieCard.js: handleDelete success: ', res)
        push('/')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={() => push(`/update-movie/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
