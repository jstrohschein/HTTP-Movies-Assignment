import axios from 'axios';
import React, { useEffect, useState }from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom'
import { Form, InputGroup, Button } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput } from './FormInput'
import * as yup from 'yup'
import { schema } from './AddMovie'




const UpdateMovie = props => {

  const { id } = useParams()
  const { push } = useHistory()

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  
  const [movie, setMovie] = useState({})

  //console.log('Movie:', movie)

  const onSubmit = data => {

    console.log('data:', data)

    const changes = {...movie, title: data.title, director: data.director, metascore: data.metascore}

    console.log('UpdateMovie.jsx: submitChanges: changes: ', changes)
     
    axios
      .put(`http://localhost:5000/api/movies/${id}`, changes)
      .then(res => {
        console.log('UpdateMovie.js: submitChanges: axios success: ', res)
        push('/')
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('UpdateMovie.jsx: axios res: ', res)
        setMovie(res.data)
      })
      .catch(err => console.log(err))
  }, [id])
  

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='form'>

      <InputGroup>
       <FormInput 
          type='text'
          id='title'
          name='title'
          label='Title'
          placeholder={`${movie.title}`}
          register={register}
          errors={errors.title}
        />
      </InputGroup>

      <InputGroup>
        <FormInput 
          type='text'
          id='director'
          name='director'
          label='Director'
          register={register}
          placeholder={`${movie.director}`}
          errors={errors.director}
        />
      </InputGroup>

      <InputGroup>
        <FormInput 
          type='text'
          id='metascore'
          name='metascore'
          label='metascore'
          register={register}
          placeholder={`${movie.metascore}`}
          errors={errors.metascore}
        />
      </InputGroup>

      <Button type='submit' className='newMovie-button'>Submit Changes </Button>
    </Form>
  )

}

export default UpdateMovie
