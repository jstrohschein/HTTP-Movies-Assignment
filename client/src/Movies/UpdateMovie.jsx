import axios from 'axios';
import React, { useEffect, useState }from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = props => {

  const [movie, setMovie] = useState(initialMovie)
  
  const { register, handleSubmit, watch, errors } = useForm()
  const { id } = useParams()

  const submitChanges = changes => {
    console.log('UpdateMovie.jsx: submitChanges: changes: ', changes)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, changes)
      .then(res => {
        console.log('UpdateMovie.js: submitChanges: axios success: ', res)
        props.setMovieList(res.data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('UpdateMovie.jsx: axios res: ', res)
      })
      .catch(err => console.log(err))
  }, [id])
  

  return (
    <form onSubmit={handleSubmit(submitChanges)}>
      <label htmlFor='' />
      <input
        type='text'
        name
      />
    </form>
  )

}

export default UpdateMovie
