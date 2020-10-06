import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'

const initialMovie = {
  id: Date.now,
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const AddMovie = () => {

  const [movie, setMovie] = useState(initialMovie)

  const handleChanges = e => {

    e.persist()
    let value = e.target.value
    let name = e.target.name
    if (name === 'metascore'){
      value = Number(value)
    }

    setMovie({
      ...movie,
      [name]: value
    })
  }

  const { register, handleSubmit, watch, errors } = useForm()

  const addMovie = movie => {

    console.log('AddMovie.jsx: addMovie: movie: ', movie)

    
  }

  return(
    <form onSubmit={handleSubmit(addMovie)}>
      <input
        type='text'
        name='title'
        id='titl'
        ref={register({ required: true })}
        onChange={handleChanges}
      />
    </form>
  )
}

export default AddMovie
