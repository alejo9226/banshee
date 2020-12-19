import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'
import { PageTitle } from '../customers/GetCustomers'

function PostLocations () {

  const [inputs, setInputs] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  const handleChange = (e) => {
    console.log(e)
    const { id, value } = e.target
    console.log('id', id)
    console.log('value', value)
    e.preventDefault()
    setInputs(inputs => ({...inputs,[id]: value}))
  }

  const createLocation = async (e) => {
    e.preventDefault()
    console.log(inputs)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/location',
        data: inputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage(data.message)
      console.log('rta', data.message)
      setTimeout(() => {
        history.push('/dashboard/locations')
      }, 2000);
    } catch ({ response }) {
      console.log(response.data.message)
      console.dir(response)
      setError(response.data.message)
    }
  }

  return (
    <Container>
    <PageTitle>Agregar Ciudad</PageTitle>
      <Form onSubmit={createLocation}>
        <Form.Group controlId="city">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa ciudad" 
            name="city" 
            value={inputs.city} 
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>Departamento</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa departamento" 
            name="state" 
            value={inputs.state} 
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Pais</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa país" 
            name="country" 
            value={inputs.country} 
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear ciudad
        </Button>
      </Form>
      {message || error}
      </Container>
  )
}

export default PostLocations