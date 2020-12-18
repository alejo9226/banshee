import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  EnterFormDiv,
  EnterForm,
  FormHeading,
  FormDescription,
  Input,
  Button,
  Label,
  InputDiv,
  Paragraph,
} from '../login/Login'
import axios from 'axios'

function Signup () {
  
  const [inputs, setInputs] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  const handleInputChange = (e) => {
    console.log(e)
    const { id, value } = e.target
    console.log('id', id)
    console.log('value', value)
    e.preventDefault()
    setInputs(inputs => ({...inputs,[id]: value}))
  }

  const createUser = async (e) => {
    e.preventDefault()

    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/user/signup`,
        data: newUser,
      })
      setMessage(data.message)
      localStorage.setItem('token', data.token)
      history.push('/login')
    } catch ({ response }) {
      setError(response.data.message)
    }


  }

  return (
    <EnterFormDiv>
      <EnterForm onSubmit={createUser}>
        <FormHeading>Registrate</FormHeading>
        <FormDescription>
          Registrate para administrar tus clientes
        </FormDescription>
        <InputDiv>
          <Label htmlFor='email'>Nombre</Label>
          <Input
            type='text'
            id='name'
            name='name'
            value={inputs.name}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            value={inputs.email}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            type='password'
            id='password'
            name='password'
            value={inputs.password}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <Button type='submit'>Registrarme</Button>
        {message || error}
        <Paragraph>
          ¿Ya tienes una cuenta?{' '}
          <Link to='/login' className='Register-link'>
            Ingresar
          </Link>
        </Paragraph>
      </EnterForm>
    </EnterFormDiv>
  )
}
export default Signup
