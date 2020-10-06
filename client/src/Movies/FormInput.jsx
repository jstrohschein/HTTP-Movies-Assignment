import React from 'react';
import { Label } from 'reactstrap'


export const FormInput = ({ register, errors, label, id, ...inputProps }) => {

  return <>
    <Label htmlFor={id}>{label}</Label>
    <br />
    <input
        ref={register}
        id={id}
        {...inputProps}
      />
      {errors && <p>{errors.message}</p>}
  </>
}