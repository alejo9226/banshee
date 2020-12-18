import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Container } from './GetCustomers'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import { addButtonStyle, iconStyle } from '../customers/GetCustomers'
import { CustomerValue } from '../customers/ViewCustomer'

export const Form = styled.form`
  margin: 0 auto;
  padding: 0 15px;
  width: 90%;
`
const ClientSubSection = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(57, 77, 107);
  border-radius: 0px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 20px;
`

const CustomerNameInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  background-color: rgba(57, 77, 107, 0.4);
  color: white;
  margin: 0;
  border-radius: 3px;
  padding: 5px 10px;
  width: 100%;
`

const CustomerLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: white;
  background-color: rgba(57, 77, 107, 0.4);
  padding: 5px 10px;
`
const CustomerValueInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: rgba(57, 77, 107, 0.8);
  background-color: rgb(243, 243, 243);
  padding: 5px 10px;
  width: 100%;
`
const CustomerBasicInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 0px 0;
`
const CustomerFinancialInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 0px 0;
`

const ClientInnerSection = styled.div`
  display: flex;
  justify-content: stretch;
  margin: 0 0 0px 0;
  width: 33.3%;

  &:nth-child(4),
  &:nth-child(5) {
    width: 50%;
  }
`

function EditCustomer () {

  const [customer, setCustomer] = useState({})
  const [inputs, setInputs] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const history = useHistory()
  useEffect(() => {
    async function getCustomer () {
      const urlItems = history.location.pathname.split('/')
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/customer/${urlItems[4]}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('el cliente', data)
        setLoading(false)
        setInputs(data.data)
        setCustomer(data.data)

      } catch ({ response }) {
        setLoading(false)
        /* setError(response.data.message) */
      }
    }
    getCustomer()
  }, [])

  const handleChange = (e) => {
    console.log(e)
    const { id, value } = e.target
    console.log('id', id)
    console.log('value', value)
    e.preventDefault()
    setInputs(inputs => ({...inputs,[id]: value}))
  }

  const updateCustomer = async (e) => {
    console.log('el anterior', customer)
    console.log('el despues', inputs)
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const meetingsRate = parseInt(inputs.meetingsRate)
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/customer/edit/${customer._id}`,
        data: {
          ...inputs,
          meetingsRate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage(data.message)
      setTimeout(() => {
        history.push('/dashboard/customers')
      }, 2000);
    } catch ({ response }) {
      console.dir(response)
    }
  }

  console.log('customer', customer)
  console.log('inputs', inputs.fullname)
  if(loading) return <Container><p>loading...</p></Container>
  if(error) return <Container><p>Something went wrong</p></Container>
  return (
    <Form onSubmit={updateCustomer}>
      {/* <CustomerNameLabel htmlFor='fullname'>Nombre Completo</CustomerNameLabel> */}
      <CustomerNameInput 
        type='text' 
        name='fullname' 
        id='fullname'
        value={inputs.fullname}
        onChange={handleChange}
      />
      <ClientSubSection>
        <CustomerBasicInfo>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Dirección</CustomerLabel>
            <CustomerValueInput 
              type='text' 
              name='address' 
              id='address'
              value={inputs.address}
              onChange={handleChange}
            />
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Teléfono</CustomerLabel>
            <CustomerValueInput 
              type='phone' 
              name='phone' 
              id='phone'
              value={inputs.phone}
              onChange={handleChange}
            />
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Ciudad</CustomerLabel>
            <CustomerValueInput 
              type='text' 
              name='city' 
              id='city'
              value={inputs.city}
              onChange={handleChange}
            />
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Departamento</CustomerLabel>
            <CustomerValueInput 
              type='text' 
              name='state' 
              id='state'
              value={inputs.state}
              onChange={handleChange}
            />
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>País</CustomerLabel>
            <CustomerValueInput 
              type='text' 
              name='country' 
              id='country'
              value={inputs.country}
              onChange={handleChange}
            />
          </ClientInnerSection>
        </CustomerBasicInfo>
        <CustomerFinancialInfo>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Cupo</CustomerLabel>
            <CustomerValueInput 
              type='number' 
              name='amount' 
              id='amount'
              value={inputs.amount}
              onChange={handleChange}
            />
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel>Cupo Disponible</CustomerLabel>
            <CustomerValue>{customer.amountLeft}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerLabel htmlFor='address'>Porcentaje de Visitas</CustomerLabel>
            <CustomerValueInput 
              type='number' 
              name='meetingsRate' 
              id='meetingsRate'
              value={inputs.meetingsRate}
              onChange={handleChange}
            />
          </ClientInnerSection>
        </CustomerFinancialInfo>
      </ClientSubSection>
      {message}
      <IconButton style={iconStyle} title="Actualizar cliente">
        <SaveIcon
          style={addButtonStyle}
          onClick={updateCustomer}
        />
      </IconButton>
    </Form>
  )
}

export default EditCustomer