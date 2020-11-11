import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AddMovie({ setMovieList }) {
  const { push } = useHistory();
  const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
  };
  const [values, setValues] = useState(initialValues);
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const movieToAdd = {
      title: values.title.trim(),
      director: values.director.trim(),
      metascore: values.metascore,
      stars: values.stars.split(','),
    };
    axios
      .post('http://localhost:5000/api/movies', movieToAdd)
      .then(res => {
        setMovieList(res.data);
        push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className='movie-form'>
      <h2>Add A Movie</h2>
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
