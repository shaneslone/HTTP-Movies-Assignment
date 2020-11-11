import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const { push } = useHistory();
  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        getMovieList();
        push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <div className='update-button'>Update Movie</div>
      </Link>
      <div className='delete-button' onClick={handleDelete}>
        Delete Movie
      </div>
    </div>
  );
}

export default Movie;
