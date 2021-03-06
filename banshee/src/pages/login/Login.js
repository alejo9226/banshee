import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios'

export const EnterFormDiv = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.thirdColor};
  height: 100vh;
  width: 60vw;
  box-sizing: border-box;
`;

export const EnterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 35px 30px;
  text-align: center;
  box-shadow: 0 0px 5px 0 #5a5a5a;
  background: #4d6470;
  border-radius: 15px;
  opacity: 1;
  left: 27%;
  color: white;
  box-sizing: border-box;

  & .radioInputs {
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
  }
  .Register-link {
    color: white;
  }
  & div div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }
`;

export const FormHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
`;

export const FormDescription = styled.p`
  margin-bottom: 30px;
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 16px;
  text-align: left;
  color: white;
  width: 100%;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  color: black;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border: 0px;
`;


export const Button = styled.button`
  border: none;
  background-color: #6e92a3;
  color: #e1eef5;
  padding: 10px 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  transition: 300ms;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0px 10px 0 #3f3f3f;
    background-color: #90a4ae;
    border-radius: 5px;
    color: white;
    font-size: 16px;

    cursor: pointer;
  }
`;

export const Paragraph = styled.p`
  bottom: 0;
  font-size: 10px;
  color: #90a4ae;
`;

function Login () {

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

  const userValidation = async (e) => {

    e.preventDefault();

    const loggingUser = {
      email: inputs.email,
      password: inputs.password
    }
    
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/user/signin`,
        data: loggingUser,
      })
      setMessage(data.message)
      localStorage.setItem('token', data.token)
      history.push('/dashboard')
    } catch ({ response }) {
      setError(response.data.message)
    }


  }
  return (
    <EnterFormDiv>
      <EnterForm onSubmit={userValidation}>
        <FormHeading>Bienvenido</FormHeading>
        <FormDescription>
          Inicia sesión para seguir administrando tus clientes
        </FormDescription>
        <InputDiv>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <Button type="submit">Ingresar</Button>
        {message || error}
        <Paragraph>
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" className="Register-link">
            Registrarme
          </Link>
        </Paragraph>
      </EnterForm>
    </EnterFormDiv>
    )
}
export default Login;
