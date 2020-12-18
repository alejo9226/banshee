import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { 
  addButtonStyle, 
  CustomerListSection as SellersListSection, 
  SingleCustomerOuterDiv as SingleSellerOuterDiv, 
  CustomerName as SellerName, 
  iconStyle, 
  SingleCustomerInnerDiv as SingleSellerInnerDiv,
  CustomerTitle as SellerTitle,
  CustomerInfo as SellerInfo
} 
  from '../customers/GetCustomers'


function GetSalesPeople () {

  const [sellers, setSellers] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [idSellerToDelete, setIdSellerToDelete] = useState('')
  const [nameSellerToDelete, setNameSellerToDelete] = useState('')
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
        setSellers(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getSellers()
  }, [showDialog])

  const addSeller = (e) => {
    history.push(`/dashboard/salespeople/add`)
  }
  const editSeller = (e) => {
    history.push(`/dashboard/salespeople/add`)
  }
  const deleteSeller = (id, name) => {
    setIdSellerToDelete(id)
    setNameSellerToDelete(name)
    setShowDialog(true)
  }

  const onDeleteModal = async (value) => {
    if (value === 'Si') {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'DELETE',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/salespeople/${idSellerToDelete}`,
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
      setIdSellerToDelete('')
      setNameSellerToDelete('')
      setShowDialog(false)
    }
  }
  return (
    <Container>
      <Dialog
        open={showDialog}
      >
        {`¿Estas seguro que deseas borrar ${nameSellerToDelete}?`}
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      <SellersListSection>
      {!!sellers && sellers.length > 0 ? 
        sellers.map(seller => {
          return (
            <SingleSellerOuterDiv 
              key={seller._id} 
              style={{cursor: 'pointer'}} 
            >
              <SingleSellerInnerDiv style={{width: '20%'}}>
                <SellerName>{seller.name}</SellerName>
              </SingleSellerInnerDiv>
              <SingleSellerInnerDiv style={{width: '20%'}}>
                <SellerTitle>Email</SellerTitle>
                <SellerInfo>{seller.email}</SellerInfo>
              </SingleSellerInnerDiv>
              <SingleSellerInnerDiv style={{width: '20%'}}>
                <SellerTitle>Telefono</SellerTitle>
                <SellerInfo>{seller.phone}</SellerInfo>
              </SingleSellerInnerDiv>
              <SingleSellerInnerDiv style={{width: '20%'}}>
                <IconButton style={{ padding: '0px' }}>
                  <DeleteIcon
                    style={{ color: 'rgba(96, 125, 139, 0.7)', fontSize: '24px' }}
                    onClick={deleteSeller.bind(this, seller._id, seller.name)}
                  />
                </IconButton>
                <IconButton style={{ padding: '0px', display: 'block' }}>
                  <EditIcon
                    style={{ color: 'rgba(96, 125, 139, 0.7)', fontSize: '24px' }}
                    onClick={editSeller.bind(this, seller._id)}
                  />
                </IconButton>
              </SingleSellerInnerDiv>
            </SingleSellerOuterDiv>
          )
        }) : <p>No tienes vendedores aun</p>
      }
      <IconButton style={iconStyle} title="Agregar vendedor">
        <AddCircleOutlineIcon
          style={addButtonStyle}
          onClick={addSeller}
        />
      </IconButton>
      </SellersListSection>
    </Container>
  )
}

export default GetSalesPeople