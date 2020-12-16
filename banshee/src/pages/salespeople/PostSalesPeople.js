import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button, Jumbotron } from 'react-bootstrap'


function PostSalesPeople () {
  const [inputs, setInputs] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createSeller = async (e) => {
    e.preventDefault()
    console.log(inputs)
    /* const newSeller = inputs */
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/salespeople',
        data: inputs
      })
      setMessage(data.message)
      console.log('rta', data.message)
    } catch ({ response }) {
      console.log(response.data.message)
      console.dir(response)
      setError(response.data.message)
    }
  }

  const handleChange = (e) => {
    console.log(e)
    const { id, value } = e.target
    console.log('id', id)
    console.log('value', value)
    e.preventDefault()
    setInputs(inputs => ({...inputs,[id]: value}))
  }
  console.log('estado', inputs)
  return (
    <Jumbotron>
      <h1>Crear Vendedor</h1>
      <Form onSubmit={createSeller}>
        <Form.Group controlId="name">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa nombre completo" 
            name="name" 
            value={inputs.name} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Ingresa email" 
            name="email" 
            value={inputs.email} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control 
            type="phone" 
            placeholder="Ingresa telefono" 
            name="phone" 
            value={inputs.phone} 
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear vendedor
        </Button>
      </Form>
      {message || error}
    </Jumbotron>
  )
}

export default PostSalesPeople