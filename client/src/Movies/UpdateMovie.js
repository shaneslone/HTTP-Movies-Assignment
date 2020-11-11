import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

export default function UpdateMovie({ getMovieList }) {
  const { id } = useParams();
  const { push } = useHistory();
  const [values, setValues] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        const { title, director, metascore, stars, id } = res.data;
        setValues({
          id: id,
          title: title,
          director: director,
          metascore: metascore,
          stars: stars.toString(),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    console.log(values.stars.split(','));
    e.preventDefault();
    const editedValues = {
      id: values.id,
      title: values.title.trim(),
      director: values.director.trim(),
      metascore: values.metascore,
      stars: values.stars.split(','),
    };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, editedValues)
      .then(res => {
        getMovieList();
        push(`/movies/${values.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className='movie-form'>
      <h2>Update Movie Info</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span className='form-label'>Title</span>
            <input
              name='title'
              type='text'
              onChange={handleChange}
              value={values.title}
            />
          </label>
        </div>
        <div>
          <label>
            <span className='form-label'>Director</span>
            <input
              name='director'
              type='text'
              onChange={handleChange}
              value={values.director}
            />
          </label>
        </div>
        <div>
          <label>
            <span className='form-label'>Metascore</span>
            <input
              name='metascore'
              type='number'
              onChange={handleChange}
              value={values.metascore}
            />
          </label>
        </div>
        <div>
          <label>
            <span className='form-label'>Stars</span>
            <input
              name='stars'
              type='text'
              onChange={handleChange}
              value={values.stars}
            />
          </label>
        </div>
        <button>Submit Movie</button>
      </form>
    </div>
  );
}
