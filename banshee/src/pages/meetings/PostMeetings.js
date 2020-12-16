import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button, Jumbotron } from 'react-bootstrap'


function PostMeetings () {
  const [inputs, setInputs] = useState({})
  const [salesPeople, setSalesPeople] = useState([])

  useEffect(() => {
    async function getSellers () {
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/salespeople',
        })
        setSalesPeople(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getSellers()
  }, [])

  const createCustomer = () => {
    axios({
      method: 'POST'
    })
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
      <h1>Crear visita</h1>
      <Form onSubmit={createCustomer}>
        <Form.Group controlId="date">
          <Form.Label>Fecha</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Ingresa fecha" 
            name="date" 
            value={inputs.date} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="salesperson">
          <Form.Label>Vendedor</Form.Label>
          <Form.Control as="select">
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
        <Form.Group controlId="netWorth">
          <Form.Label>Valor Neto</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingresa valor neto" 
            name="netWorth"
            value={inputs.netWorth}
            onChange={handleChange}
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
          Crear cliente
        </Button>
      </Form>
    </Jumbotron>
  )
}

export default PostMeetings