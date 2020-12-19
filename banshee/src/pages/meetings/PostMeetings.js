import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { PageTitle } from '../customers/GetCustomers'


function PostMeetings () {
  const [inputs, setInputs] = useState({})
  const [salesPeople, setSalesPeople] = useState([])
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  useEffect(() => {
    async function getSellers () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/salespeople',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSalesPeople(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    async function getCustomers () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/customer',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(data.data)
        setCustomers(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getSellers()
    getCustomers()
  }, [])

  const createMeeting = async (e) => {
    e.preventDefault()
    console.log(inputs)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/meeting',
        data: inputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage(data.message)
      console.log('rta', data.message)
      setTimeout(() => {
        history.push('/dashboard/meetings')
      }, 2000);
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
    <Container>
      <PageTitle>Crear visita</PageTitle>
      <Form onSubmit={createMeeting}>
       <Form.Group controlId="date">
          <Form.Label>Fecha</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Ingresa fecha" 
            name="date" 
            value={inputs.date} 
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="seller">
          <Form.Label>Vendedor</Form.Label>
          <Form.Control 
            as="select" 
            name="seller" 
            value={inputs.seller}
            onChange={handleChange}
            required
          >
            <option>
              Escoge el vendedor
            </option>
          {!!salesPeople &&
            salesPeople.length &&
            salesPeople.map((person) => {
              return (
                <option value={person._id} key={person._id}>
                  {person.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="customer">
          <Form.Label>Cliente</Form.Label>
          <Form.Control 
             as="select" 
             name="customer" 
             value={inputs.customer}
             onChange={handleChange}
             required
          >
            <option>
              Escoge el cliente
            </option>
          {!!customers &&
            customers.length &&
            customers.map((customer) => {
              return (
                <option value={customer._id} key={customer._id}>
                  {customer.fullname}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="netAmount">
          <Form.Label>Valor Neto</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingresa valor neto" 
            name="netAmount"
            value={inputs.netAmount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="comments">
          <Form.Control 
            as="textarea" 
            placeholder="Comentarios de la visita" 
            rows={3} 
            name="comments"
            value={inputs.comments}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear visita
        </Button>
        {error || message}
      </Form>
    </Container>
  )
}

export default PostMeetings