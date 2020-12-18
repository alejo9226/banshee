import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Jumbotron, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


export const Container = styled.section`
  margin: 0 auto;
  padding: 0 15px;
  width: 90%;
`

export const PageTitle = styled.h1`
  font-size: 24px;
  color: rgb(57, 77, 107);
  text-align: center;
  margin: 10px 0 30px 0;
`
const Th = styled.th`
  text-align: center;
  vertical-align: middle;
`
export const CustomerListSection = styled.div`
  width: 100%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SingleCustomerOuterDiv = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  color: rgba(96, 125, 139, 1);
  border: 1px solid rgb(57, 77, 107);
  overflow: scroll;
  transition: 400ms;
  
  &:last-child {
    margin-bottom: 0;
  } 
  &:hover {
    background-color: rgba(57, 77, 107, 0.1);
  }
`
export const SingleCustomerSection = styled.div`
  display: flex;
  width: 95%;
`

export const CustomerName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: rgba(57, 77, 107, 0.8);
  margin: 0;
`
export const CustomerTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 5px 0;
  color: rgba(57, 77, 107, 0.8);
`
export const CustomerInfo = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
`

export const SingleCustomerInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border-left: 1px solid rgba(96, 125, 139, 0.7);
  width: 20%;
  box-sizing: border-box;
  &:first-child {
    border-left: 0px;
    justify-content: center;
    width: 30%
  } 
  &:last-child {
    border-left: 1px solid rgba(96, 125, 139, 0.7);
    width: 5%;
  } 
`

export const iconStyle = {
  color: 'rgba(96, 125, 139, 0.9)', 
  position: 'absolute',
  right: '5%',
  bottom: '5%'
}
export const addButtonStyle = {
  color: 'rgba(96, 125, 139, 0.9)', 
  fontSize: '45px'
}

function GetCustomers () {

  const [customers, setCustomers] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [idCustomerToDelete, setIdCustomerToDelete] = useState('')
  const [nameCustomerToDelete, setNameCustomerToDelete] = useState('')

  const history = useHistory()

  useEffect(() => {
    async function getCustomers () {
      try {
        const token = localStorage.getItem('token')

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
    getCustomers()
  }, [showDialog])

  const addCustomer = () => {
    history.push('/dashboard/customers/add')
  }
  const viewCustomer = (id) => {
    history.push(`/dashboard/customers/view/${id}`)
  }
  const editCustomer = (id) => {
    history.push(`/dashboard/customers/edit/${id}`)
  }
  const deleteCustomer = (id, fullname) => {
    setIdCustomerToDelete(id)
    setNameCustomerToDelete(fullname)
    setShowDialog(true)
  }

  const onDeleteModal = async (value) => {
    if (value === 'Si') {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'DELETE',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/customer/${idCustomerToDelete}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(data.data)
      } catch (err) {
        console.dir(err)
      }
      setShowDialog(false)
    } else {
      setIdCustomerToDelete('')
      setNameCustomerToDelete('')
      setShowDialog(false)
    }
  }

  console.log('clientes', customers)
  return (
    <Container>
      {!!customers && customers.length > 0 ? 
      <>
      <PageTitle>Todos los Clientes</PageTitle>
      <Dialog
        open={showDialog}
      >
        {`¿Estas seguro que deseas borrar ${nameCustomerToDelete}?`}
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
        <CustomerListSection>
        {customers.map(customer => {
            return (
              <SingleCustomerOuterDiv 
                key={customer._id} 
                style={{cursor: 'pointer'}} 
              >
                <SingleCustomerSection onClick={viewCustomer.bind(this, customer._id)}>
                  <SingleCustomerInnerDiv>
                    <CustomerName>{customer.fullname}</CustomerName>
                  </SingleCustomerInnerDiv>
                  <SingleCustomerInnerDiv>
                    <CustomerTitle>Ubicación</CustomerTitle>
                    <CustomerInfo>{`${customer.city}, ${customer.country}`}</CustomerInfo>
                  </SingleCustomerInnerDiv>
                  <SingleCustomerInnerDiv>
                    <CustomerTitle>Cupo</CustomerTitle>
                    <CustomerInfo>{`$${customer.amount}`}</CustomerInfo>
                  </SingleCustomerInnerDiv>
                  <SingleCustomerInnerDiv>
                    <CustomerTitle>Cupo Disponible</CustomerTitle>
                    <CustomerInfo>{`$${customer.amountLeft}`}</CustomerInfo>
                  </SingleCustomerInnerDiv>
                  <SingleCustomerInnerDiv>
                    <CustomerTitle>Visitas</CustomerTitle>
                    <CustomerInfo>{customer.meetings.length}</CustomerInfo>
                  </SingleCustomerInnerDiv>
                </SingleCustomerSection>
                <SingleCustomerInnerDiv>
                  <IconButton style={{ padding: '0px' }}>
                    <DeleteIcon
                      style={{ color: 'rgba(96, 125, 139, 0.7)', fontSize: '24px' }}
                      onClick={deleteCustomer.bind(this, customer._id, customer.fullname)}
                    />
                  </IconButton>
                  <IconButton style={{ padding: '0px', display: 'block' }}>
                    <EditIcon
                      style={{ color: 'rgba(96, 125, 139, 0.7)', fontSize: '24px' }}
                      onClick={editCustomer.bind(this, customer._id)}
                    />
                  </IconButton>
                </SingleCustomerInnerDiv>
               
              </SingleCustomerOuterDiv>
            )
          })
        }
        </CustomerListSection>
      </> : <p>No tienes clientes todavia</p>}   
      <IconButton style={iconStyle} title="Agregar cliente">
        <AddCircleOutlineIcon
          style={addButtonStyle}
          onClick={addCustomer}
        />
      </IconButton>
    </Container>
  )
}

export default GetCustomers