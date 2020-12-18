import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Container } from './GetCustomers'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { addButtonStyle, iconStyle } from '../customers/GetCustomers'
import { Table } from 'react-bootstrap'

const ClientSubSection = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(57, 77, 107);
  border-radius: 0px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 20px;
`

const CustomerName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  background-color: rgba(65, 95, 139, 0.699);
  color: white;
  margin: 0;
  border-radius: 3px;
  padding: 5px 10px;
`

const CustomerTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: white;
  background-color: rgba(65, 95, 139, 0.4);
  padding: 5px 10px;
  width: 140px;
  &.customer-title {
    background-color: rgba(65, 95, 139, 0.699);
    font-size: 20px;
    width: 100%;
  }
`
export const CustomerValue = styled.p`
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
  align-items: stretch;
  margin: 0 0 0px 0;
  width: 33.3%;
  border-bottom: 1px solid rgba(65, 95, 139, 0.4);

  &:nth-child(4),
  &:nth-child(5) {
    width: 50%;
  }
`

function ViewCustomer () {

  const [customer, setCustomer] = useState({})
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        setCustomer(data.data)

      } catch ({ response }) {
        setLoading(false)
        setError(response.data.message)
      }
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/meeting/customer/${urlItems[4]}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('el cliente', data)
        setLoading(false)
        setMeetings(data.data)

      } catch ({ response }) {
        setLoading(false)
        setError(response.data.message)
      }
    }
    getCustomer()
  }, [])

  const editCustomer = (id) => {
    history.push(`/dashboard/customers/edit/${id}`)
  }
  const editMeeting = (id) => {
    history.push(`/dashboard/meetings/edit/${id}`)
  }
  const deleteMeeting = (id) => {
  }

  console.log(customer)
  if(loading) return <Container><p>loading...</p></Container>
  if(error) return <Container><p>Something went wrong</p></Container>
  return (
    <Container>
      <CustomerName>{customer.fullname}</CustomerName>
      <ClientSubSection>
        <CustomerTitle className='customer-title'>Información del Cliente</CustomerTitle>
        <CustomerBasicInfo>
          <ClientInnerSection>
            <CustomerTitle>Dirección</CustomerTitle>
            <CustomerValue>{customer.address}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Teléfono</CustomerTitle>
            <CustomerValue>{customer.phone}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Ciudad</CustomerTitle>
            <CustomerValue>{customer.city}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Departamento</CustomerTitle>
            <CustomerValue>{customer.state}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Pais</CustomerTitle>
            <CustomerValue>{customer.country}</CustomerValue>
          </ClientInnerSection>
        </CustomerBasicInfo>
        <CustomerFinancialInfo>
          <ClientInnerSection>
            <CustomerTitle>Cupo</CustomerTitle>
            <CustomerValue>{customer.amount}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Cupo Disponible</CustomerTitle>
            <CustomerValue>{customer.amountLeft}</CustomerValue>
          </ClientInnerSection>
          <ClientInnerSection>
            <CustomerTitle>Porcentaje de Visitas</CustomerTitle>
            <CustomerValue>{customer.meetingsRate}</CustomerValue>
          </ClientInnerSection>
        </CustomerFinancialInfo>
      </ClientSubSection>
      <ClientSubSection>
        <CustomerTitle className='customer-title'>Visitas</CustomerTitle>
        {!!meetings && meetings.length > 0 ? 
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Fecha Visita</th>
            <th>Vendedor</th>
            <th>Valor Neto</th>
            <th>Valor Visita</th>
            <th>Comentarios</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
        {meetings.map(meeting => {
            return (
              <tr>
                <td>{meeting.date.split('T')[0]}</td>
                <td>{meeting.seller.name}</td>
                <td>{meeting.netAmount}</td>
                <td>{meeting.meetingValue}</td>
                <td>{meeting.comments}</td>
                <td>
                  <IconButton title="Editar visita" style={{padding: '3px'}}>
                    <EditIcon
                      onClick={editMeeting.bind(this, meeting._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                  <IconButton title="Borrar visita" style={{padding: '3px'}}>
                    <DeleteIcon
                      onClick={deleteMeeting.bind(this, customer._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                </td>
              </tr>
            )
          }) 
        }
        </tbody>
      </Table> : <p>No tienes visitas a este cliente aun</p>}

      </ClientSubSection>
      <IconButton style={iconStyle} title="Editar cliente">
        <EditIcon
          style={addButtonStyle}
          onClick={editCustomer.bind(this, customer._id)}
        />
      </IconButton>
    </Container>
  )
}

export default ViewCustomer