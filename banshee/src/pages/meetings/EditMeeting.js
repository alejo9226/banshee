import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { PageTitle } from '../customers/GetCustomers'


function EditMeetings () {

  const [inputs, setInputs] = useState({})
  const [meeting, setMeeting] = useState([])
  const [sellers, setSellers] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const history = useHistory()

  useEffect(() => {
    async function getMeeting () {
      const urlItems = history.location.pathname.split('/')
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/meeting/${urlItems[4]}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setInputs(data.data)
        setMeeting(data.data)
        setLoading(false)
      } catch ({ response }) {
        setLoading(false)
        setError(response.data.message)
      }
    }
    async function getSellers () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/salespeople`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSellers(data.data)
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
          url: `/customer`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCustomers(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getMeeting()
    getSellers()
    getCustomers()
  }, [history.location.pathname])

  const handleChange = (e) => {
    console.log(e)
    const { id, value } = e.target
    console.log('id', id)
    console.log('value', value)
    e.preventDefault()
    setInputs(inputs => ({...inputs,[id]: value}))
  }

  const updateMeeting = async (e) => {
    console.log('el anterior', meeting)
    console.log('el despues', inputs)
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/meeting/${meeting._id}`,
        data: inputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage(data.message)
      setTimeout(() => {
        history.push('/dashboard/meetings')
      }, 2000);
    } catch ({ response }) {
      console.dir(response)
    }
  }

  console.log('visita', meeting)
  if(loading) return <Container><p>loading...</p></Container>
  if(error) return <Container><p>Something went wrong</p></Container>
  return (
    <Container>
      <PageTitle>Editar visita</PageTitle>
      <Form onSubmit={updateMeeting}>
       <Form.Group controlId="date">
          <Form.Label>Fecha</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Ingresa fecha" 
            name="date" 
            value={inputs.date ? inputs.date.split('T')[0] : inputs.date } 
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
          {!!sellers &&
            sellers.length &&
            sellers.map((seller) => {
              return (
                <option value={seller._id} key={seller._id}>
                  {seller.name}
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar visita
        </Button>
        {error || message}
      </Form>
    </Container>
  )
}

export default EditMeetings