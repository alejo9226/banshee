import axios from 'axios'
import { useState } from 'react'
import { Form, Button, Jumbotron } from 'react-bootstrap'


function PostCustomers () {
  const [inputs, setInputs] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createCustomer = async (e) => {
    e.preventDefault()
    console.log(inputs)
    /* const newSeller = inputs */
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/customer',
        data: inputs
      })
      setMessage(data.message)
    } catch ({ response }) {
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
      <h1>Crear cliente</h1>
      <Form onSubmit={createCustomer}>
        <Form.Group controlId="nit">
          <Form.Label>NIT</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa NIT" 
            name="nit" 
            value={inputs.nit} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fullname">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa nombres y apellidos" 
            name="fullname"
            value={inputs.fullname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Dirección</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa dirección de domicilio" 
            name="address"
            value={inputs.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control 
            type="phone" 
            placeholder="Ingresa teléfono" 
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa teléfono" 
            name="city"
            value={inputs.city}
            onChange={handleChange}
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
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Pais</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa pais de residencia" 
            name="country"
            value={inputs.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Cupo</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingresa el cupo" 
            name="amount"
            value={inputs.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="meetingsRate">
          <Form.Label>Porcentaje Visitas</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingresa el % de visitas" 
            name="meetingsRate"
            value={inputs.meetingsRate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear cliente
        </Button>
      </Form>
      {error || message}
    </Jumbotron>
  )
}

export default PostCustomers