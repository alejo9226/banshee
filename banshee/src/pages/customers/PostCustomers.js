import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { PageTitle } from './GetCustomers'


function PostCustomers () {
  const [inputs, setInputs] = useState({})
  const [locations, setLocations] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    async function getLocations () {
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/location',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLocations(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    setMessage('')
    getLocations()
  }, [])

  const createCustomer = async (e) => {
    e.preventDefault()
    console.log(inputs)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/customer',
        data: inputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage(data.message)
      setTimeout(() => {
        history.push('/dashboard/customers')
      }, 2000);
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

  const getStates = (array = []) => {
    return array.map(location => location.state)
  }
  const getCountries = (array = []) => {
    return array.map(location => location.country)
  }

  const removeDuplicates = (arr = []) => {
    return arr.filter((el, i) => {
      return arr.indexOf(el) === i
    })
  }

  console.log('estado', inputs)
  return (
    <Container style={{paddingBottom: '30px'}}>
      <PageTitle>Crear cliente</PageTitle>
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
            placeholder="Ingresa nombre completo" 
            name="fullname"
            value={inputs.fullname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Dirección</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa dirección" 
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
            as="select" 
            name="city" 
            value={inputs.city}
            onChange={handleChange}
            required
          >
            <option>
              Escoge la ciudad
            </option>
          {!!locations &&
            locations.length > 0 && 
            locations.map((location) => {
              return (
                <option value={location.city} key={location._id}>
                  {location.city}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>Departamento</Form.Label>
          <Form.Control 
            as="select" 
            name="state" 
            value={inputs.state}
            onChange={handleChange}
            required
          >
            <option>
              Escoge el departamento
            </option>
          {!!locations &&
            locations.length > 0 && (
              removeDuplicates(getStates(locations)).map(state => {
                return (
                  <option value={state}>
                    {state}
                  </option>
                )
              })
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>País</Form.Label>
          <Form.Control 
            as="select" 
            name="country" 
            value={inputs.country}
            onChange={handleChange}
            required
          >
            <option>
              Escoge el país
            </option>
          {!!locations &&
            locations.length > 0 &&
            removeDuplicates(getCountries(locations)).map((country) => {
              return (
                <option value={country} >
                  {country}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Cupo</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingresa el cupo máximo" 
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
    </Container>
  )
}

export default PostCustomers