import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form'
import axios from 'axios'
import * as Yup from 'yup'
import { FormInput } from './FormInput'
import { Form, InputGroup, Button } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'



export const schema = Yup.object().shape({
  title: Yup
    .string()
    .max(30, 'Title must be shorter than 30 characters')
    .required('Required'),
  director: Yup
    .string()
    .max(25, 'Director should be shorter than 25 characters')
    .required('Required'),
  metascore: Yup
    .number()
    .min(0, 'metascore cannot be less than 0')
    .max(100, 'metascore cannot be greater than 100')
    .required('Required'),
})

const AddMovie = () => {

  const { push } = useHistory();

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stars'
  })



  const onSubmit = movie => {
    const newMovie = {...movie, id: Date.now(), stars: movie.stars.map(star => star.name)}
    console.log('New Movie', newMovie)
    axios
      .post('http://localhost:5000/api/movies', newMovie)
      .then(res => {
        console.log('NewMovie Axios POST Success: ', res)
        push('/')
      })
      .catch(err => console.log('NewMovie Axios POST error: ', err.message))
    
  }

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className='form'>

      <InputGroup>
       <FormInput 
          type='text'
          id='title'
          name='title'
          label='Title'
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
          errors={errors.metascore}
        />
      </InputGroup>

      <InputGroup>
        {fields.map(( id , index) => {
          return (
            <div key={id}>
              <FormInput 
                type='text'
                id='stars'
                name={`stars[${index}].name`}
                label={`star ${index + 1}`}
                register={register}
                errors={errors.metascore}
              />
            </div>
          )
        })}
      <Button className='newStar-button' onClick={() => append({

      })}>New Star</Button>
      </InputGroup>


    <Button type='submit' className='newMovie-button'>Add Movie</Button>
    </Form>
  )
}

export default AddMovie
